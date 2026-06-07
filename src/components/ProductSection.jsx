import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import p1Image from '../assets/p1.png'
import './ProductSection.css'

export default function ProductSection({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [products] = useState([
    {
      id: 1,
      name: 'The Anti-Looter Kit',
      price: '$52.74',
      image: p1Image,
      description: 'Smart Home Defense System for Family Protection',
      affiliateLink: 'https://www.theantilooterkit.com/main/#aff=hamzashahsyed92916f'
    },
    {
      id: 2,
      name: 'HydroLean XT Gold',
      price: '$86.73',
      image: '/p2.png',
      description: 'Advanced Hydration & Wellness Support',
      affiliateLink: 'https://hydroleanxt.com/ds/go/indexvs.php#aff=hamzashahsyed92916f'
    },
    {
      id: 3,
      name: 'The Premium Prompt Library for Smarter Affiliate Execution',
      price: '$9.11',
      image: '/pinterest_affiliate_pin.png',
      description: 'The Premium Prompt Library for Smarter Affiliate Execution',
      affiliateLink: 'http://heikoboos.com/1000-prompts-for-affiliate-marketing#aff=hamzashahsyed92916f'
    },
    {
      id: 4,
      name: 'USB-C Cable',
      price: '$12.99',
      image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Durable USB-C charging cable, 6ft length',
      affiliateLink: 'https://amazon.com/s?k=usb-c+cable'
    },
    {
      id: 5,
      name: 'Phone Stand',
      price: '$15.99',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Adjustable phone stand for desk and table',
      affiliateLink: 'https://amazon.com/s?k=phone+stand'
    },
    {
      id: 6,
      name: 'Portable Charger',
      price: '$34.99',
      image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '20000mAh portable power bank with fast charging',
      affiliateLink: 'https://amazon.com/s?k=portable+charger'
    },
    {
      id: 7,
      name: 'Keyboard',
      price: '$49.99',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      description: 'Mechanical keyboard with RGB lighting',
      affiliateLink: 'https://amazon.com/s?k=mechanical+keyboard'
    },
    {
      id: 8,
      name: 'Mouse',
      price: '$29.99',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Wireless mouse with precision tracking',
      affiliateLink: 'https://amazon.com/s?k=wireless+mouse'
    },
    {
      id: 9,
      name: 'Monitor Stand',
      price: '$39.99',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Adjustable monitor stand with storage',
      affiliateLink: 'https://amazon.com/s?k=monitor+stand'
    },
    {
      id: 10,
      name: 'Webcam',
      price: '$59.99',
      image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '1080p HD webcam with built-in microphone',
      affiliateLink: 'https://amazon.com/s?k=hd+webcam'
    }
  ])

  // Get URL parameters
  const filteredProducts = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const productId = params.get('product')
    
    let filtered = products
    
    // Filter by product ID if specified
    if (productId) {
      filtered = filtered.filter(p => p.id === parseInt(productId))
    }
    
    // Filter by search term (name and description)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      )
    }
    
    // Filter by price range
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price.replace('$', ''))
      const min = minPrice ? parseFloat(minPrice) : 0
      const max = maxPrice ? parseFloat(maxPrice) : Infinity
      return price >= min && price <= max
    })
    
    return filtered
  }, [products, searchTerm, minPrice, maxPrice])

  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h2>Our Products</h2>
        <p className="section-subtitle">Discover our collection of premium tech products</p>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by product name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="price-filter-section">
            <div className="price-input-group">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
              />
            </div>
            {(searchTerm || minPrice || maxPrice) && (
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm('')
                  setMinPrice('')
                  setMaxPrice('')
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found matching your search criteria.</p>
          </div>
        ) : (
          <>
            <p className="results-count">Showing {filteredProducts.length} product(s)</p>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
