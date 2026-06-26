import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // useNavigate add kiya redirect karne ke liye
import axios from 'axios'
import './PropertyDetail.css'

function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate() // Navigation initialize kari
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://real-estate-website-zdvn.onrender.com/api/properties/${id}`)
        setProperty(response.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 1. Check karo ki user logged in hai ya nahi
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Inquiry bhejne ke liye pehle login karein!')
      // Optional: Agar aap direct login page par bhejna chahti hain toh niche wali line use karein
      // navigate('/login')
      return
    }

    // 2. Form fields validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Saare fields bharo!')
      return
    }

    // 3. API call with JWT Token
    try {
      await axios.post(
        'https://real-estate-website-zdvn.onrender.com/api/inquiries', 
        {
          ...formData,
          propertyId: property._id,
          propertyTitle: property.title
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Backend validation ke liye token bheja
          }
        }
      )
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Inquiry submit karne mein error aaya!')
    }
  }

  if (loading) return <div className="spinner"></div>
  if (!property) return <div className="loading">Property not found!</div>

  return (
    <div className="detail-page">

      {/* Property Image */}
      <img src={property.images[0]} alt={property.title} className="detail-image" />

      {/* Property Info */}
      <div className="detail-content">
        <div className="detail-left">
          <span className={`badge ${property.type === 'Sale' ? 'sale' : 'rent'}`}>
            {property.type}
          </span>
          <h1>{property.title}</h1>
          <p className="detail-location">📍 {property.location}</p>
          <p className="detail-price">₹ {property.price.toLocaleString('en-IN')}</p>
          <p className="detail-description">{property.description}</p>

          {/* Specifications */}
          <div className="specs-table">
            <h3>Specifications</h3>
            <table>
              <tbody>
                <tr>
                  <td>🛏 Bedrooms</td>
                  <td>{property.bedrooms}</td>
                </tr>
                <tr>
                  <td>🚿 Bathrooms</td>
                  <td>{property.bathrooms}</td>
                </tr>
                <tr>
                  <td>📐 Area</td>
                  <td>{property.area} sq.ft</td>
                </tr>
                <tr>
                  <td>🏷 Type</td>
                  <td>{property.type}</td>
                </tr>
                <tr>
                  <td>✅ Status</td>
                  <td>{property.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="detail-right">
          <div className="inquiry-form">
            <h3>📩 Send Inquiry</h3>
            {submitted ? (
              <p className="success-msg">✅ Inquiry submitted successfully!</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <p className="form-error">{error}</p>}
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
                <button type="submit">Submit Inquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail