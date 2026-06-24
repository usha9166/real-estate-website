import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <div className="hero">
        <h1>Find Your Dream Home</h1>
        <p>Browse thousands of properties for sale and rent across India</p>
        <div className="search-bar">
  <input type="text" placeholder="Search by location, property name..." />
  <button>Search</button>
</div>
        <Link to="/listing" className="hero-btn">Explore Properties</Link>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <h3>🏠 Buy</h3>
          <p>Find the perfect home to buy</p>
        </div>
        <div className="feature-card">
          <h3>🔑 Rent</h3>
          <p>Explore rental properties near you</p>
        </div>
        <div className="feature-card">
          <h3>📍 Locate</h3>
          <p>Search by location and price range</p>
        </div>
      </div>

    </div>
  )
}

export default Home