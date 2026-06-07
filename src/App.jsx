import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import ProductSection from './components/ProductSection'
import ContactForm from './components/ContactForm'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import AdminPanel from './components/AdminPanel'

function AppContent() {
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
      <Routes>
        <Route path="/" element={
          <>
            <ProductSection addToCart={addToCart} />
            <ContactForm />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
      
      {showCart && (
        <Cart cartItems={cart} onClose={() => setShowCart(false)} />
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
