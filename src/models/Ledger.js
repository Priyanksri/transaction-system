const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    closing_balance: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.Ledger || mongoose.model('Ledger', ledgerSchema);