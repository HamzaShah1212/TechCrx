import { useState } from 'react'
import './ProductCard.css'

export default function ProductCard({ product, addToCart }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleBuyNow = () => {
    addToCart(product)
    // Open Amazon affiliate link in new tab
    window.open(product.affiliateLink, '_blank')
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {!imageLoaded && <div className="image-skeleton"></div>}
        <img 
          src={product.image} 
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="product-footer">
          <span className="price">{product.price}</span>
          <button 
            className="buy-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
