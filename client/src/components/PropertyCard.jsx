// PropertyCard component - Displays individual property details
import './PropertyCard.css'
import { Link } from 'react-router-dom'

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      {/* Property Image */}
      <img src={property.image} alt={property.title} />

      <div className="card-info">
        {/* Sale/Rent Badge */}
        <span className={`badge ${property.type === 'Sale' ? 'sale' : 'rent'}`}>
          {property.type}
        </span>

        {/* Property Details */}
        <h3>{property.title}</h3>
        <p className="location">📍 {property.location}</p>
        <p className="price">₹ {property.price}</p>

        {/* Link to Property Detail page */}
        <Link to={`/property/${property.id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard