import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { CATEGORIES } from '../data/categories'
import toast from 'react-hot-toast'
import './AdminPage.css'

export default function AdminPage() {
  const { adminProducts, addProduct, deleteProduct } = useProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'appalams',
    price: '',
    unit: '',
    description: '',
    image: '',
    badge: ''
  })

  // Basic password protection
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      toast.success('Welcome back, Owner!')
    } else {
      toast.error('Invalid password')
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill all required fields')
      return
    }

    addProduct({
      ...formData,
      price: Number(formData.price)
    })
    
    toast.success('Product uploaded successfully!')
    setFormData({
      name: '',
      category: 'appalams',
      price: '',
      unit: '',
      description: '',
      image: '',
      badge: ''
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-page login-mode">
        <header className="page-hero">
          <div className="container">
            <h1>Admin <span className="text-gradient">Portal</span></h1>
            <p>Please enter your access password to manage products.</p>
          </div>
        </header>

        <section className="section container">
          <div className="glass-card login-card animate-fade-in-up">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Hint: admin123"
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">Enter Portal</button>
            </form>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="page-hero">
        <div className="container">
          <div className="flex-between">
            <div>
              <span className="badge badge-saffron">Management</span>
              <h1>Product <span className="text-gradient">Dashboard</span></h1>
              <p>Upload new products and manage your existing handcrafted catalog.</p>
            </div>
            <button className="btn btn-ghost btn-dark" onClick={() => setIsAuthenticated(false)}>Logout</button>
          </div>
        </div>
      </header>

      <section className="section container">
        <div className="admin-grid">
          {/* Upload Form */}
          <div className="upload-section glass-card animate-fade-in">
            <h3>Upload New Product</h3>
            <form onSubmit={handleUpload} className="admin-form">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input 
                  type="text" className="form-input" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Spicy Garlic Appalam" required 
                />
              </div>

              <div className="flex-group">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select 
                    className="form-select"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input 
                    type="number" className="form-input" 
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="150" required 
                  />
                </div>
              </div>

              <div className="flex-group">
                <div className="form-group">
                  <label className="form-label">Unit Weight</label>
                  <input 
                    type="text" className="form-input" 
                    value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    placeholder="e.g. 250g" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Badge Label</label>
                  <input 
                    type="text" className="form-input" 
                    value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    placeholder="e.g. New / Hot" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Image URL *</label>
                <input 
                  type="url" className="form-input" 
                  value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Unsplash or direct image link" required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea 
                  className="form-textarea"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the taste and ingredients..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full">🚀 Upload Product</button>
            </form>
          </div>

          {/* Product List */}
          <div className="product-list-section">
            <h3 style={{ marginBottom: '24px' }}>Your Uploads ({adminProducts.length})</h3>
            
            {adminProducts.length > 0 ? (
              <div className="admin-items">
                {adminProducts.map(p => (
                  <div key={p.id} className="admin-item-card glass-card">
                    <img src={p.image} alt={p.name} className="admin-item-img" />
                    <div className="admin-item-info">
                      <h4>{p.name}</h4>
                      <p className="admin-item-meta">{p.category} • ₹{p.price}</p>
                    </div>
                    <button className="delete-btn" onClick={() => deleteProduct(p.id)}>🗑️</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-small">
                <p>No products uploaded yet. Use the form to add some!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
