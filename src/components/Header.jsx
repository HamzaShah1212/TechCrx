import { useState } from 'react'
import './Header.css'

export default function Header({ cartCount, onCartClick, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🛍️ TechRx Store</h1>
          <p>Premium Tech Products</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button 
            className="cart-btn"
            onClick={() => {
              onCartClick()
              setMenuOpen(false)
            }}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </div>
    </header>
  )
}
