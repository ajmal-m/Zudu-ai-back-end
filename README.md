# 🌐 Node.js Express Server

A basic backend server built with **Node.js** and **Express**, connected to **MongoDB Atlas**, and using **JWT authentication** with access and refresh tokens.

---

## 🚀 Features

- 🌍 RESTful API with Express
- 🛡️ Secure authentication using JWT (access + refresh)
- 🌱 Environment variable-based config
- 🌐 MongoDB connection via Mongoose
- 🔄 Token refresh mechanism

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ajmal-m/Zudu-ai-back-end.git
cd your-node-server
```

2. Install Dependencies

```bash
npm install
# or
yarn

```
3. Environment Variables
```bash
PORT=
MONGODB_URI=
ACCESS_SECRET=
REFRESH_SECRET=


```

4.Development

```bash
node index.js
```
### 🗂️ Project Structure

```bash
node-server/
├── controllers/         # Route handler logic
├── middleware/          # JWT and other middleware
├── models/              # Mongoose schemas
├── routes/              # API endpoints
├── .env                 # Environment variables (not committed)
├── .env.example         # Example env config
├── app.js               # Express app config
├── server.js            # Entry point
├── package.json
└── README.
```
### 📡 API Base URL
```bash
http://localhost:3000

```
### 🔐 JWT Usage
Access tokens are signed using ACCESS_SECRET

Refresh tokens use REFRESH_SECRET

Store them securely on the client


### 🛠️ Built With

Express

Mongoose

dotenv

jsonwebtoken

Nodemon (for dev)
