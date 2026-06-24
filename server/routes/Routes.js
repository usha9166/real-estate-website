const express = require('express')
const router = express.Router()
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/Controller')

// GET all properties
router.get('/', getAllProperties)

// GET single property
router.get('/:id', getPropertyById)

// POST create property
router.post('/', createProperty)

// PUT update property
router.put('/:id', updateProperty)

// DELETE property
router.delete('/:id', deleteProperty)

module.exports = router