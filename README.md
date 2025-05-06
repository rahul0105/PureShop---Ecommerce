# PureShop - MERN Stack E-commerce Platform

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- PayPal integration for payments
- Admin dashboard for product management
- Responsive design

## Live Demo

- Frontend: [https://pureshop-frontend.vercel.app](https://pureshop-frontend.vercel.app)
- Backend API: [https://pureshop-backend.onrender.com](https://pureshop-backend.onrender.com)

> Note: The demo links will be active after deployment. Please replace these placeholder URLs with your actual deployed URLs.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: PayPal
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- PayPal Developer Account (for payment integration)

## Installation

1. Clone the repository

```bash
git clone <your-repository-url>
cd pureshop
```

2. Install dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Environment Variables
   Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

4. Run the application

```bash
# Run backend only
npm start

# Run frontend only
npm run client

# Run both frontend and backend
npm run dev
```

## Deployment

### Backend Deployment

1. Create a free account on [Render](https://render.com) or [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set up environment variables
4. Deploy the backend

### Frontend Deployment

1. Create a free account on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set up environment variables
4. Deploy the frontend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Rahul
