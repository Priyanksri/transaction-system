const express = require('express');
const router = express.Router();
const { creditWallet, debitWallet } = require('../controllers/adminController');

// POST /admin/wallet/credit
router.post('/credit', creditWallet);

// POST /admin/wallet/debit
router.post('/debit', debitWallet);

module.exports = router;