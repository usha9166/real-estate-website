const Inquiry = require('../models/Inquiry')

// POST - Submit inquiry
const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, propertyId, propertyTitle } = req.body

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      propertyId,
      propertyTitle
    })

    await inquiry.save()
    res.status(201).json({ message: 'Inquiry submitted successfully!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET - All inquiries (admin only)
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { submitInquiry, getAllInquiries }
