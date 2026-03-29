import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import './CartPage.css'

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()
  
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [whatsappLink, setWhatsappLink] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })

  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [adminWhatsAppNumber, setAdminWhatsAppNumber] = useState('919999999999')

  useEffect(() => {
    // Load from localStorage first
    try {
      const local = localStorage.getItem('nalamvaazha_settings')
      if (local) {
        const parsed = JSON.parse(local)
        setDeliveryCharge(Number(parsed.deliveryCharge) || 0)
        setAdminWhatsAppNumber(parsed.whatsappNumber || '919999999999')
      }
    } catch {}

    // Then try API
    axios.get('/api/settings', { timeout: 1000 })
      .then(res => {
        const s = res.data.data
        setDeliveryCharge(Number(s.deliveryCharge) || 0)
        setAdminWhatsAppNumber(s.whatsappNumber || '919999999999')
      })
      .catch(() => {})
  }, [])

  const grandTotal = totalPrice + deliveryCharge

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true)

    try {
      // 1. Save to Database
      const orderPayload = {
        customer: formData,
        items: items.map(item => ({
          product: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          lineTotal: item.price * item.qty
        })),
        subtotal: totalPrice,
        deliveryCharge,
        grandTotal
      }

      let orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
      try {
        const res = await axios.post('/api/orders', orderPayload)
        orderId = res.data.data.orderId;
      } catch (dbError) {
        console.warn('MongoDB backend offline. Bypassing DB save and proceeding manually.');
      }

      // 2. Generate WhatsApp Message
      let message = `🛒 *NEW ORDER — NALAM VAAZHA*\n━━━━━━━━━━━━━━━━━━━\n\n`
      message += `👤 *Customer Details:*\n`
      message += `Name: ${formData.name}\n`
      message += `Phone: ${formData.phone}\n`
      message += `Address: ${formData.address}\n`
      if (formData.notes) message += `Notes: ${formData.notes}\n`
      
      message += `\n📦 *Order Items:*\n━━━━━━━━━━━━━━━━━━━\n`
      items.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* × ${item.qty} — ₹${item.price * item.qty}\n`
      })
      message += `━━━━━━━━━━━━━━━━━━━\n`
      
      message += `💰 *Subtotal:* ₹${totalPrice}\n`
      if (deliveryCharge > 0) message += `🚚 *Delivery Charge:* ₹${deliveryCharge}\n`
      message += `━━━━━━━━━━━━━━━━━━━\n`
      message += `🧾 *Grand Total:* ₹${grandTotal}\n`
      message += `━━━━━━━━━━━━━━━━━━━\n\n`
      
      message += `📅 Order Date: ${new Date().toLocaleString()}\n`
      message += `🆔 Order ID: ${orderId}\n\n`
      message += `Thank you for ordering! 🙏`

      const encoded = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encoded}`

      // 3. Open WhatsApp immediately (direct user action context avoids popup blocker)
      const opened = window.open(whatsappUrl, '_blank')

      // 4. Clear cart and show success
      clearCart()

      if (!opened) {
        // Popup was blocked — show the link so user can tap it
        setWhatsappLink(whatsappUrl)
        toast.error('Popup blocked! Please tap the WhatsApp button below to send your order.')
      } else {
        toast.success('Order placed! Check WhatsApp to send your order message.')
        navigate('/')
      }

    } catch (error) {
      console.error(error)
      toast.error('Failed to submit order. Please try again.')
    } finally {
      setLoading(false)
    }
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
            {whatsappLink ? (
              <>
                <span className="icon">✅</span>
                <h3>Order Ready!</h3>
                <p>Your browser blocked the popup. Tap the button below to send your order via WhatsApp.</p>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
                  Open WhatsApp & Send Order
                </a>
                <Link to="/shop" className="btn btn-ghost btn-dark" style={{ marginTop: 12 }}>Continue Shopping</Link>
              </>
            ) : (
              <>
                <span className="icon">🛒</span>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
              </>
            )}
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
                    <img src={item.image?.url || item.image} alt={item.name} className="item-img" />
                    <div>
                      <h4>{item.name}</h4>
                      <p className="item-cat">{typeof item.category === 'object' ? item.category?.name : item.category}</p>
                    </div>
                  </div>
                  <div className="item-price-col">₹{item.price}</div>
                  <div className="item-qty-col">
                    <div className="qty-picker">
                      <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-total-col">
                    <strong>₹{item.price * item.qty}</strong>
                    <button className="item-remove-btn" title="Remove Item" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/shop" className="continue-shop-link">← Continue Shopping</Link>
          </div>

          {/* Sidebar Summary & Form */}
          <aside className="cart-summary glass-card">
            <h3>Order Summary</h3>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={deliveryCharge === 0 ? "text-success" : ""}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="summary-total">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            
            {!showForm ? (
              <>
                <button className="btn btn-whatsapp btn-lg w-full whatsapp-order-btn" onClick={() => setShowForm(true)}>
                  <span>📱</span> Place Order via WhatsApp
                </button>
                <p className="order-note">Clicking the button will ask for your delivery details before placing the order.</p>
              </>
            ) : (
              <form className="checkout-form animate-fade-in" onSubmit={handleOrderSubmit}>
                <h4 style={{marginTop: '20px', marginBottom: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '20px'}}>Delivery Details</h4>
                <div className="form-group" style={{marginBottom: '12px'}}>
                  <input type="text" className="form-input" placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="form-group" style={{marginBottom: '12px'}}>
                  <input type="tel" className="form-input" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <div className="form-group" style={{marginBottom: '12px'}}>
                  <textarea className="form-textarea" placeholder="Complete Delivery Address *" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required></textarea>
                </div>
                <div className="form-group" style={{marginBottom: '16px'}}>
                  <textarea className="form-textarea" placeholder="Special Instructions (Optional)" rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
                </div>
                <button type="submit" disabled={loading} className="btn btn-whatsapp btn-lg w-full whatsapp-order-btn p-static">
                  {loading ? 'Processing...' : 'Place Order & Open WhatsApp'}
                </button>
                <button type="button" className="btn btn-ghost w-full" style={{marginTop: '8px'}} onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </form>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}
