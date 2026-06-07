import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🛍️ TechRx Store</h1>
          <p>Premium Tech Products</p>
        </Link>

        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          
          {isAdmin && (
            <Link to="/admin" className="admin-link" onClick={() => setMenuOpen(false)}>
              ⚙️ Admin
            </Link>
          )}

          <button 
            className="cart-btn"
            onClick={() => {
              onCartClick()
              setMenuOpen(false)
            }}
          >
            🛒 Cart ({cartCount})
          </button>

          {user ? (
            <>
              <span className="user-info">{user.name}</span>
              <button 
                className="auth-btn logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="auth-btn login-btn"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="auth-btn signup-btn"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
