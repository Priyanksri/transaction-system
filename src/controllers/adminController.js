const Wallet = require('../models/Wallet');
const Ledger = require('../models/Ledger');

// POST /admin/wallet/credit
const creditWallet = async (req, res) => {
    try {
        const { client_id, amount } = req.body;

        if (!client_id || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid client_id or amount' });
        }

        // Find or create wallet
        let wallet = await Wallet.findOne({ client_id });
        if (!wallet) {
            wallet = await Wallet.create({ client_id, balance: 0 });
        }

        wallet.balance += amount;
        await wallet.save();

        // Ledger entry
        await Ledger.create({
            client_id,
            type: 'credit',
            amount,
            closing_balance: wallet.balance
        });

        res.status(200).json({
            message: 'Wallet credited successfully',
            balance: wallet.balance
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /admin/wallet/debit
const debitWallet = async (req, res) => {
    try {
        const { client_id, amount } = req.body;

        if (!client_id || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid client_id or amount' });
        }

        const wallet = await Wallet.findOne({ client_id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        wallet.balance -= amount;
        await wallet.save();

        // Ledger entry
        await Ledger.create({
            client_id,
            type: 'debit',
            amount,
            closing_balance: wallet.balance
        });

        res.status(200).json({
            message: 'Wallet debited successfully',
            balance: wallet.balance
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { creditWallet, debitWallet };