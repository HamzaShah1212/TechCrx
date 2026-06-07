import { useState, useMemo, useEffect } from 'react'
import ProductCard from './ProductCard'
import { supabase } from '../lib/supabaseClient'
import './ProductSection.css'

export default function ProductSection({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch products from database
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', true)
        .order('id', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Get URL parameters
  const filteredProducts = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const productId = params.get('product')
    
    if (productId) {
      // Show only the specified product
      return products.filter(p => p.id === parseInt(productId))
    }
    // Show all products if no parameter
    return products
  }, [products])

  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h2>Our Products</h2>
        <p className="section-subtitle">Discover our collection of premium tech products</p>
        
        {loading ? (
          <div className="loading-spinner">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">No products found. Please check back later!</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={{
                  ...product,
                  price: `$${product.price}`,
                  affiliateLink: product.affiliate_link
                }}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
