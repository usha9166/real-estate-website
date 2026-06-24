// Listing page - Shows all properties with search and filter
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import './Listing.css'

function Listing() {
  // State for properties, loading and error
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for filter values
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  })

  // Fetch properties from API with optional filters
  const fetchProperties = async (filterParams = {}) => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/properties', {
        params: filterParams
      })
      setProperties(response.data)
      setLoading(false)
    } catch (err) {
      setError('Properties load karne mein error aaya!')
      setLoading(false)
    }
  }

  // Fetch all properties on page load
  useEffect(() => {
    fetchProperties()
  }, [])

  // Update filter state on input change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  // Apply active filters and fetch results
  const handleSearch = () => {
    const activeFilters = {}
    if (filters.keyword) activeFilters.keyword = filters.keyword
    if (filters.location) activeFilters.location = filters.location
    if (filters.type) activeFilters.type = filters.type
    if (filters.minPrice) activeFilters.minPrice = filters.minPrice
    if (filters.maxPrice) activeFilters.maxPrice = filters.maxPrice
    fetchProperties(activeFilters)
  }

  // Clear all filters and fetch all properties
  const handleClear = () => {
    setFilters({
      keyword: '',
      location: '',
      type: '',
      minPrice: '',
      maxPrice: ''
    })
    fetchProperties()
  }

  if (loading) return <div className="spinner"></div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="listing-page">

      {/* Filter Panel */}
      <div className="filter-panel">
        <h3>🔍 Search & Filter</h3>
        <div className="filter-grid">
          <input
            type="text"
            name="keyword"
            placeholder="Search by title..."
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location..."
            value={filters.location}
            onChange={handleFilterChange}
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price..."
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price..."
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-buttons">
          <button onClick={handleSearch} className="search-btn">Search</button>
          <button onClick={handleClear} className="clear-btn">Clear Filters</button>
        </div>
      </div>

      {/* Results */}
      <h2>All Properties</h2>
      <p className="listing-count">{properties.length} properties found</p>

      {/* Empty state message */}
      {properties.length === 0 && (
        <div className="empty-state">
          <p>😔 Koi property nahi mili! Filters clear karo.</p>
        </div>
      )}

      {/* Property Cards Grid */}
      <div className="listing-grid">
        {properties.map(property => (
          <PropertyCard key={property._id} property={{
            id: property._id,
            title: property.title,
            location: property.location,
            price: property.price.toLocaleString('en-IN'),
            type: property.type,
            image: property.images[0]
          }} />
        ))}
      </div>
    </div>
  )
}

export default Listing