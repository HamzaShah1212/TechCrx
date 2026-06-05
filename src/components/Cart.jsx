import './Cart.css'

export default function Cart({ cartItems, onClose }) {
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return sum + price
  }, 0)

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>🛒 Your cart is empty</p>
            <p className="text-small">Add items to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="item-image">{item.image}</div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
