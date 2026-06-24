import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    title: '', description: '', type: 'Sale',
    price: '', location: '', bedrooms: '',
    bathrooms: '', area: '', images: ''
  })
  const navigate = useNavigate()

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchProperties()
  }, [navigate])

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties')
      setProperties(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const data = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      images: formData.images ? [formData.images] : []
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/properties/${editId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('http://localhost:5000/api/properties', data, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      setShowForm(false)
      setEditId(null)
      setFormData({
        title: '', description: '', type: 'Sale',
        price: '', location: '', bedrooms: '',
        bathrooms: '', area: '', images: ''
      })
      fetchProperties()
    } catch (err) {
      alert('Error saving property!')
    }
  }

  const handleEdit = (property) => {
    setEditId(property._id)
    setFormData({
      title: property.title,
      description: property.description,
      type: property.type,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      images: property.images[0] || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchProperties()
    } catch (err) {
      alert('Error deleting property!')
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🛠 Admin Dashboard</h1>
        <button onClick={() => { setShowForm(!showForm); setEditId(null) }} className="add-btn">
          {showForm ? 'Cancel' : '+ Add Property'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="admin-form">
          <h3>{editId ? 'Edit Property' : 'Add New Property'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
              <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
              <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
              </select>
              <input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required />
              <input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
              <input name="area" type="number" placeholder="Area (sq.ft)" value={formData.area} onChange={handleChange} required />
              <input name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} />
            </div>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="3" required />
            <button type="submit" className="save-btn">{editId ? 'Update Property' : 'Save Property'}</button>
          </form>
        </div>
      )}

      {/* Properties Table */}
      <div className="admin-table">
        <h3>All Properties ({properties.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id}>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>₹ {property.price.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`badge ${property.type === 'Sale' ? 'sale' : 'rent'}`}>
                    {property.type}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleEdit(property)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(property._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard