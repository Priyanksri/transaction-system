const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/admin/wallet', require('./routes/adminRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/wallet', require('./routes/walletRoutes'));

module.exports = app;