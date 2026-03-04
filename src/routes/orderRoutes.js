const express = require('express');
const router = express.Router();
const { createOrder, getOrder } = require('../controllers/orderController');

// POST /orders
router.post('/', createOrder);

// GET /orders/:order_id
router.get('/:order_id', getOrder);

module.exports = router;