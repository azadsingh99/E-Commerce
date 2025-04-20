# E-Commerce Full Stack Application

A modern e-commerce application built with React, Redux Toolkit, Node.js, Express, and MongoDB.

## Features

- Product listing with filtering and pagination
- Category filters
- Price range filter
- Sort functionality
- Shopping cart
- Wishlist functionality
- Responsive design

## Tech Stack

### Frontend
- React (with Vite)
- Redux Toolkit for state management
- TailwindCSS for styling
- Headless UI for accessible components
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB (without Mongoose)
- Joi for validation

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Routes

### Products
- GET /api/products - Get paginated products with filters
- GET /api/products/:id - Get single product
- POST /api/products - Create new product

### Categories
- GET /api/categories - Get all categories

### Cart
- GET /api/cart - Get cart contents
- POST /api/cart/add - Add item to cart
- DELETE /api/cart/remove/:productId - Remove item from cart

## Adding Products

Use the POST `/api/products` endpoint to add products:

```json
{
  "title": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "category": "fashion",
  "image": "https://example.com/image.jpg",
  "rating": {
    "rate": 4.5,
    "count": 120
  }
}
```

Required fields: `title`, `price`, `description`, `category`

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── store/
    │   └── App.jsx
    └── package.json
