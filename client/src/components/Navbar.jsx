// Navbar component - Navigation with hamburger menu for mobile
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  // Get logged in user from localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">🏠 RealEstate</Link>
      </div>

      {/* Hamburger Icon - visible on mobile only */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/listing" onClick={() => setMenuOpen(false)}>Properties</Link></li>

        {/* Admin link - visible only to admin users */}
        {user?.role === 'admin' && (
          <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
        )}

        {/* Show Logout if logged in, else show Login/Register */}
        {user ? (
          <li>
            <span
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => {
                localStorage.clear()
                window.location.href = '/'
              }}>
              Logout
            </span>
          </li>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar