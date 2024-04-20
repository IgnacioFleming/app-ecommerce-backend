# 🛒 E-commerce App - Backend

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License](https://img.shields.io/badge/license-ISC-blue)](#)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](#)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-blue)](#)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-00bfff)](#)

Welcome to the **E-commerce App Backend**, a robust and scalable API for managing an online store. Built with Node.js, Express, and MongoDB, it supports full user authentication (including GitHub OAuth), real-time updates with Socket.IO, file uploads with Cloudinary, and Stripe integration for payment processing.

---

## 📊 Technologies Used

- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: Passport.js (Local Strategy + GitHub OAuth + JWT)
- **Payments**: Stripe (one-time payments)
- **Real-Time Updates**: Socket.IO
- **File Storage**: Cloudinary + Multer
- **Email Service**: Nodemailer (Gmail)
- **API Documentation**: Swagger UI
- **Environment Variables**: dotenv
- **Logging**: Winston
- **Testing**: Mocha + Chai + Supertest

---

## 🚀 Key Features

- User authentication with local login, JWT tokens, and GitHub OAuth.
- Secure password handling with bcrypt.
- CRUD operations for products, carts, and orders.
- Real-time product updates and cart interactions using WebSockets.
- Integration with Stripe for one-time payments.
- File uploads for product images stored in Cloudinary.
- Email notifications through Gmail.
- API documentation via Swagger UI.
- Modular and scalable architecture.
- Environment-based configuration (development and production).

---

## ⚙️ How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/IgnacioFleming/app-ecommerce-backend.git
cd app-ecommerce-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure the environment:**

Create a `.env` file at the project root with the following variables:

```ini
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
STRIPE_SECRET_API_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_ID=your_github_client_id
CLIENT_SECRET=your_github_client_secret
CALLBACK_URL=http://localhost:8080/api/sessions/githubCallback
SERVICE=gmail
USER=your_gmail_user
PASSWORD=your_gmail_password
PORT=8080
URL=http://localhost:8080
DEV_CLIENT_URL=http://localhost:5173
PROD_CLIENT_URL=https://webapp-ecommerce-frontend.vercel.app
```

4. **Start the development server:**

```bash
npm run dev
```

Server will start on `http://localhost:8080` by default.

## 📂 Project Structure

```bash
src/
├── config/           # Configuration files (passport, mongoose, etc.)
├── controllers/      # Business logic and request handling
├── middlewares/      # Express middlewares (auth, error handling)
├── dao/              # Mongoose schemas and models
├── routes/           # API endpoints
├── services/         # External services (Cloudinary, Nodemailer, Stripe)
├── utils/            # Utility functions
├── views/            # Handlebars views (optional server-side rendering)
└── app.js            # Main application entry point
```

## 🌐 API Documentation

API is documented with Swagger UI.
Access the documentation at:

```bash
http://localhost:8080/api/docs
```

## 🛡️ API Main Endpoints Overview

| Method |            Endpoint             |       Description       |
| :----: | :-----------------------------: | :---------------------: |
|  POST  |      `/api/sessions/login`      |       User login        |
|  GET   |     `/api/sessions/github`      |   GitHub OAuth login    |
|  POST  |         `/api/products`         |   Create new product    |
|  GET   |         `/api/products`         |  Retrieve all products  |
|  POST  |          `/api/carts`           |    Create a new cart    |
|  POST  | `/api/carts/:cid/products/:pid` |   Add product to cart   |
|  POST  |    `/create-payment-intent`     | Initiate Stripe payment |

(Authentication required for most operations)

## 👨‍💻 Author

Developed by Ignacio Fleming
