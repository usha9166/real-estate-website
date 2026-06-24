const express = require('express')
const router = express.Router()
const { submitInquiry, getAllInquiries } = require('../controllers/inquiryController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.post('/', submitInquiry)
router.get('/', protect, adminOnly, getAllInquiries)

module.exports = router