const express = require('express')
const router = express.Router()
const { submitInquiry, getAllInquiries } = require('../controllers/inquiryController')
// protect middleware humne import kiya hua hai
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Pehle yahan 'protect' nahi tha, ab humne laga diya hai taaki bina login kiye inquiry submit na ho
router.post('/', protect, submitInquiry)

// Yeh admin ke liye pehle se hi protected tha
router.get('/', protect, adminOnly, getAllInquiries)

module.exports = router