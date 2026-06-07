import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductSection from './components/ProductSection'
import ContactForm from './components/ContactForm'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="app">
      <Header 
        cartCount={cart.length} 
        onCartClick={() => setShowCart(true)}
        onSearch={handleSearch}
      />
      <ProductSection addToCart={addToCart} searchTerm={searchTerm} />
      <ContactForm />
      <Footer />
      
      {showCart && (
        <Cart cartItems={cart} onClose={() => setShowCart(false)} />
      )}
    </div>
  )
}

export default App
