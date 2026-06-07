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

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <div className="app">
      <Header 
        cartCount={cart.length} 
        onCartClick={() => setShowCart(true)}
      />
      <ProductSection addToCart={addToCart} />
      <ContactForm />
      <Footer />
      
      {showCart && (
        <Cart cartItems={cart} onClose={() => setShowCart(false)} />
      )}
    </div>
  )
}

export default App
