// Main App component - Routing configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import PropertyDetail from './pages/PropertyDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar - shown on all pages */}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App