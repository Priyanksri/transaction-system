const axios = require('axios');
const Wallet = require('../models/Wallet');
const Order = require('../models/Order');
const Ledger = require('../models/Ledger');

// POST /orders
const createOrder = async (req, res) => {
    try {
        const client_id = req.headers['client-id'];
        const { amount } = req.body;

        if (!client_id) {
            return res.status(400).json({ message: 'client-id header is required' });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Find wallet
        const wallet = await Wallet.findOne({ client_id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct balance atomically
        wallet.balance -= amount;
        await wallet.save();

        // Create order
        const order = await Order.create({
            client_id,
            amount,
            status: 'pending'
        });

        // Call fulfillment API
        try {
            const fulfillmentRes = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                userId: client_id,
                title: order._id.toString()
            });

            order.fulfillment_id = fulfillmentRes.data.id.toString();
            order.status = 'fulfilled';
            await order.save();

        } catch (fulfillErr) {
            // Fulfillment failed - mark order as failed
            order.status = 'failed';
            await order.save();

            // Refund wallet
            wallet.balance += amount;
            await wallet.save();

            return res.status(502).json({ message: 'Fulfillment API failed', error: fulfillErr.message });
        }

        // Ledger entry
        await Ledger.create({
            client_id,
            type: 'debit',
            amount,
            closing_balance: wallet.balance
        });

        res.status(201).json({
            message: 'Order created successfully',
            order
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET /orders/:order_id
const getOrder = async (req, res) => {
    try {
        const client_id = req.headers['client-id'];
        const { order_id } = req.params;

        if (!client_id) {
            return res.status(400).json({ message: 'client-id header is required' });
        }

        const order = await Order.findOne({ _id: order_id, client_id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createOrder, getOrder };