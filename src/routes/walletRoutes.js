const express = require('express');
const router = express.Router();
const { getBalance } = require('../controllers/walletController');

// GET /wallet/balance
router.get('/balance', getBalance);

module.exports = router;