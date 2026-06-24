const Property = require('../models/Property')

// GET all properties with search & filter
const getAllProperties = async (req, res) => {
  try {
    const { keyword, location, type, minPrice, maxPrice } = req.query

    let filter = {}

    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' }
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' }
    }

    if (type) {
      filter.type = type
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const properties = await Property.find(filter)
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET single property
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json(property)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST create property
const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body)
    const savedProperty = await property.save()
    res.status(201).json(savedProperty)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json(property)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json({ message: 'Property deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
}