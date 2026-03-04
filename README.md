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


## AI Prompts Used

I used Claude (Anthropic) to help me during development.
Here's roughly how I prompted it:

### 1. Getting Started
"I have a jr dev assignment to build a transaction system with 
wallets. Help me set it up step by step with Express and MongoDB."

### 2. Models
"What models do I need for a wallet system that tracks orders 
and transaction history?"

### 3. Order Logic
"If creating an order fails midway, how do I make sure the 
wallet balance is refunded?"

### 4. Debugging
"I'm getting OverwriteModelError in mongoose, how do I fix it?"
"DB connection failing with ECONNREFUSED on MongoDB Atlas, what 
should I check?"

### 5. General
"Explain this error and help me fix it" (used multiple times 
during debugging)
