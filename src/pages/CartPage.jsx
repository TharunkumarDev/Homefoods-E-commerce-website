import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPage.css'

const WHATSAPP_NUMBER = '919999999999' // Placeholder

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart()

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return

    let message = '🏡 *HomeFresh Order*\n\n'
    items.forEach(item => {
      message += `• *${item.name}* (${item.unit || ''})\n`
      message += `  Qty: ${item.qty} × ₹${item.price} = ₹${item.price * item.qty}\n\n`
    })
    message += `━━━━━━━━━━━━━━━━━━\n`
    message += `*Total: ₹${totalPrice}*\n\n`
    message += `Please confirm my order. Thank you! 🙏`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <header className="page-hero">
          <div className="container">
            <h1>Your <span className="text-gradient">Cart</span></h1>
          </div>
        </header>
        <section className="section container">
          <div className="empty-state">
            <span className="icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <header className="page-hero">
        <div className="container">
          <span className="badge badge-saffron">{totalItems} Items</span>
          <h1>Review Your <span className="text-gradient">Order</span></h1>
          <p>You're just one step away from authentic homemade goodness.</p>
        </div>
      </header>

      <section className="section container">
        <div className="cart-grid">
          {/* Main List */}
          <div className="cart-list">
            <div className="cart-header-labels">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            
            <div className="cart-items-wrap">
              {items.map(item => (
                <div key={item.id} className="cart-page-item">
                  <div className="item-details">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div>
                      <h4>{item.name}</h4>
                      <p className="item-cat">{item.category}</p>
                    </div>
                  </div>
                  <div className="item-price-col">₹{item.price}</div>
                  <div className="item-qty-col">
                    <div className="qty-picker">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-total-col">
                    <strong>₹{item.price * item.qty}</strong>
                    <button className="item-remove-btn" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/shop" className="continue-shop-link">← Continue Shopping</Link>
          </div>

          {/* Sidebar Summary */}
          <aside className="cart-summary glass-card">
            <h3>Order Summary</h3>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="summary-total">
                <span>Grand Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            
            <button className="btn btn-primary btn-lg w-full whatsapp-order-btn" onClick={handleWhatsAppOrder}>
              <span>📱</span> Order via WhatsApp
            </button>
            <p className="order-note">Clicking the button will open WhatsApp with your pre-filled order details. Payment and shipping details will be discussed on chat.</p>
          </aside>
        </div>
      </section>
    </div>
  )
}
