const Wallet = require('../models/Wallet');

// GET /wallet/balance
const getBalance = async (req, res) => {
    try {
        const client_id = req.headers['client-id'];

        if (!client_id) {
            return res.status(400).json({ message: 'client-id header is required' });
        }

        const wallet = await Wallet.findOne({ client_id });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        res.status(200).json({
            client_id,
            balance: wallet.balance
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getBalance };