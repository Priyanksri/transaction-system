# Transaction System

A wallet-based transaction system built with Node.js, Express, and MongoDB.

## Setup
1. Clone the repo
2. Run `npm install`
3. Add `.env` with your `MONGO_URI`
4. Run `npm run dev`

## APIs
- POST /admin/wallet/credit
- POST /admin/wallet/debit
- POST /orders
- GET /orders/:order_id
- GET /wallet/balance
