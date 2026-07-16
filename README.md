# Razorpay Electronics Store

A full-stack Electronics Store built using the MERN stack with secure Razorpay payment integration. Users can browse products, search and filter items, make secure payments, generate payment links, and download invoices.

---

## Features

- Browse electronics products
- Product search functionality
- Category filtering
- Razorpay Checkout Integration
- Razorpay Payment Link generation
- Order Management
- Invoice Download
- Responsive UI
- MongoDB Database Integration
- REST API using Express.js

---

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Payment Gateway
- Razorpay Checkout
- Razorpay Payment Links

---

## Project Structure

```
razorpay-electronics-store/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/rishahermain7-eng/razorpay-electronics-store.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret
```
