import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './CartDrawer.css'

const WHATSAPP_NUMBER = '919999999999' // Replace with actual WhatsApp number

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart()

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

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <span>🛒</span>
            <h2>Your Cart</h2>
          </div>
          <button className="cart-drawer__close" onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">🛍️</span>
              <h3>Your cart is empty</h3>
              <p>Add some delicious products to get started!</p>
              <button className="btn btn-primary btn-sm" onClick={onClose}>
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item__image"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&q=60' }}
                  />
                  <div className="cart-item__info">
                    <h4 className="cart-item__name">{item.name}</h4>
                    <p className="cart-item__price">₹{item.price} {item.unit && `/ ${item.unit}`}</p>
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >−</button>
                      <span className="cart-item__qty-num">{item.qty}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >+</button>
                    </div>
                  </div>
                  <div className="cart-item__right">
                    <p className="cart-item__total">₹{item.price * item.qty}</p>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__summary">
              <div className="cart-drawer__row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="cart-drawer__row cart-drawer__row--shipping">
                <span>Delivery</span>
                <span className="cart-drawer__free">Free 🎉</span>
              </div>
              <div className="cart-drawer__row cart-drawer__row--total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              className="btn btn-primary cart-drawer__whatsapp-btn"
              onClick={handleWhatsAppOrder}
            >
              <span>📱</span>
              Order via WhatsApp
            </button>

            <Link to="/cart" className="btn btn-secondary cart-drawer__view-btn" onClick={onClose}>
              View Full Cart
            </Link>

            <button
              className="cart-drawer__clear"
              onClick={clearCart}
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
