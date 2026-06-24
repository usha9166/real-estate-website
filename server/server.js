// Main server file - Express app setup
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const propertyRoutes = require('./routes/Routes')
const authRoutes = require('./routes/authRoutes')
const inquiryRoutes = require('./routes/inquiryRoutes')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware setup
app.use(cors({
  origin: ['http://localhost:5173', 'https://tranquil-caramel-8abffe.netlify.app']
}))
app.use(bodyParser.json())
app.use(express.json())

// API Routes
app.use('/api/properties', propertyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy!' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})