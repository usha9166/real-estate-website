# Real Estate Listing Website

A full-stack real estate listing website built as part of Web Development Internship.

## Live Demo
- 🌐 Frontend: https://tranquil-caramel-8abffe.netlify.app
- 🔧 Backend API: https://real-estate-website-zdvn.onrender.com

## Project Overview
Platform allows users to browse, search and inquire about properties for sale and rent across India. Built with React.js frontend connected to a Node.js/Express.js REST API backend with MongoDB Atlas database.

## Tech Stack

### Frontend (Completed ✅)
- React.js
- CSS3
- React Router DOM v6
- Axios (API calls)

### Backend (Completed ✅)
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcryptjs (Password Hashing)

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## Features

### Completed ✅
- Navbar with navigation links and hamburger menu
- Home page with Hero section and search bar
- Property listing page with cards
- Sale/Rent badges with colour coding
- Routing between all pages
- Node.js/Express.js REST API server
- MongoDB database with Property schema
- Complete CRUD API endpoints
- Frontend connected to live MongoDB API
- User Registration with bcrypt password hashing
- User Login with JWT token generation
- Auth Middleware for protected routes
- Search & Filter (keyword, location, type, price range)
- Dynamic results re-rendering
- Clear filters functionality
- Property Detail page with specifications table
- Inquiry Form with MongoDB storage
- Admin Dashboard with Add/Edit/Delete property
- Protected admin route (admin role only)
- Fully responsive design (mobile, tablet, desktop)
- Loading spinner and empty state messages
- Email & password validation on registration
- Admin link in navbar (admin only)
- Logout functionality
- Code refactoring with comments
- Deployed on Netlify + Render + MongoDB Atlas

## Project Structure

real-estate-website/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PropertyCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Listing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── PropertyDetail.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── App.jsx
│   └── vite.config.js
│
├── server/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── Controller.js
│   │   ├── authController.js
│   │   └── inquiryController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Property.js
│   │   ├── User.js
│   │   └── Inquiry.js
│   ├── routes/
│   │   ├── Routes.js
│   │   ├── authRoutes.js
│   │   └── inquiryRoutes.js
│   ├── seed.js
│   └── server.js
│
└── README.md

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/properties | Get all properties (with filters) |
| GET | /api/properties/:id | Get single property |
| POST | /api/properties | Create property |
| PUT | /api/properties/:id | Update property |
| DELETE | /api/properties/:id | Delete property |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/inquiries | Submit inquiry |

## Setup Instructions

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

### Database Seed
```bash
cd server
node seed.js
```

## Weekly Progress

| Week | Tasks | Status |
|------|-------|--------|
| Week 1 | Project setup, React app, Routing | ✅ Complete |
| Week 2 | Navbar, Home page, Property cards | ✅ Complete |
| Week 3 | Backend server, MongoDB, Schema | ✅ Complete |
| Week 4 | CRUD APIs, Frontend-Backend connect | ✅ Complete |
| Week 5 | Auth (JWT), Search & Filter | ✅ Complete |
| Week 6 | Detail page, Admin dashboard | ✅ Complete |
| Week 7 | Responsive design, Bug fixes, Refactoring | ✅ Complete |
| Week 8 | Cloud deployment, Documentation | ✅ Complete |