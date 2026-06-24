const mongoose = require('mongoose')
const Property = require('./models/Property')
require('dotenv').config()

const properties = [
  {
    title: "Modern 2BHK Apartment",
    description: "Beautiful modern apartment with all amenities",
    type: "Sale",
    price: 4500000,
    location: "Bandra, Mumbai",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"],
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    status: "available"
  },
  {
    title: "Spacious 3BHK Villa",
    description: "Luxurious villa with private garden and pool",
    type: "Rent",
    price: 25000,
    location: "Koramangala, Bangalore",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"],
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    status: "available"
  },
  {
    title: "Cozy Studio Apartment",
    description: "Perfect studio apartment for working professionals",
    type: "Rent",
    price: 12000,
    location: "Connaught Place, Delhi",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"],
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    status: "available"
  },
  {
    title: "Luxury 4BHK Penthouse",
    description: "Premium penthouse with panoramic city views",
    type: "Sale",
    price: 12000000,
    location: "Jubilee Hills, Hyderabad",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"],
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    status: "available"
  },
  {
    title: "2BHK Independent House",
    description: "Independent house with parking and garden",
    type: "Rent",
    price: 18000,
    location: "Aundh, Pune",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"],
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    status: "available"
  },
  {
    title: "Premium 3BHK Flat",
    description: "Premium flat in prime location with modern amenities",
    type: "Sale",
    price: 6200000,
    location: "Anna Nagar, Chennai",
    images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400"],
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    status: "available"
  },
  {
    title: "1BHK Affordable Apartment",
    description: "Affordable apartment perfect for small families",
    type: "Sale",
    price: 2800000,
    location: "Wakad, Pune",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"],
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    status: "available"
  },
  {
    title: "Spacious 5BHK Bungalow",
    description: "Grand bungalow with large lawn and servant quarters",
    type: "Sale",
    price: 25000000,
    location: "Boat Club Road, Pune",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"],
    bedrooms: 5,
    bathrooms: 5,
    area: 5000,
    status: "available"
  }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected!')

    await Property.deleteMany({})
    console.log('Old data deleted!')

    await Property.insertMany(properties)
    console.log('Sample data inserted!')

    mongoose.connection.close()
    console.log('Done! Database seeded successfully!')
  } catch (error) {
    console.log('Error:', error)
    process.exit(1)
  }
}

seedDB()