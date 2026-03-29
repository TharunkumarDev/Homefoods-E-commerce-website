import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useProducts } from '../context/ProductContext'
import './AdminPage.css'

export default function AdminPage() {
  const {
    allProducts: products, categories, isApiOnline,
    addProduct, updateProduct, deleteProduct, togglePublish,
    refreshData
  } = useProducts()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders, setOrders] = useState([])

  // Product form
  const [prodForm, setProdForm] = useState({
    name: '', category: '', price: '', stock: '100', description: '', image: '', salePrice: ''
  })

  // Settings form
  const [sData, setSData] = useState({
    businessName: '', whatsappNumber: '', deliveryCharge: 0
  })

  // Edit product
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editSearch, setEditSearch] = useState('')

  const getProductId = (p) => p._id || p.id

  // Image file to base64
  const handleImageFile = (file, setter, field) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setter(prev => ({ ...prev, [field]: e.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e, setter, field) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer?.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file, setter, field)
    }
  }

  // Load settings from localStorage first, then try API
  useEffect(() => {
    // Local settings
    try {
      const local = localStorage.getItem('nalamvaazha_settings')
      if (local) {
        const parsed = JSON.parse(local)
        setSData(parsed)
      }
    } catch {}

    // Try API for orders & settings
    const fetchAdminData = async () => {
      const results = await Promise.allSettled([
        axios.get('/api/admin/orders', { timeout: 1000 }),
        axios.get('/api/settings', { timeout: 1000 })
      ])
      if (results[0].status === 'fulfilled') setOrders(results[0].value.data.data)
      if (results[1].status === 'fulfilled') {
        const apiSettings = results[1].value.data.data
        setSData({
          businessName: apiSettings.businessName || '',
          whatsappNumber: apiSettings.whatsappNumber || '',
          deliveryCharge: apiSettings.deliveryCharge || 0
        })
      }
    }
    fetchAdminData()
  }, [])

  useEffect(() => {
    if (categories.length && !prodForm.category) {
      setProdForm(f => ({ ...f, category: categories[0]?._id || categories[0]?.slug || '' }))
    }
  }, [categories])

  // Dashboard Stats
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    outOfStock: products.filter(p => p.stock === 0).length
  }

  // ── Handlers ──────────────────────────────────────

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return
    const success = await deleteProduct(id)
    if (success) {
      toast.success('Product deleted')
    } else {
      toast.error('Delete failed')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const success = await addProduct(prodForm)
    if (success) {
      toast.success('Product created!')
      setProdForm({ name: '', category: categories[0]?._id || categories[0]?.slug || '', price: '', stock: '100', description: '', image: '', salePrice: '' })
    } else {
      toast.error('Upload failed')
    }
  }

  const handleTogglePublish = async (id) => {
    const success = await togglePublish(id)
    if (success) {
      toast.success('Product visibility updated')
    }
  }

  const startEditing = (product) => {
    setEditingId(getProductId(product))
    setEditForm({
      name: product.name,
      price: product.price,
      salePrice: product.salePrice || '',
      stock: product.stock ?? 100,
      description: product.description || '',
      category: product.category?._id || product.category?.slug || '',
      image: product.images?.[0]?.url || product.image || ''
    })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleSaveEdit = async (id) => {
    const success = await updateProduct(id, editForm)
    if (success) {
      toast.success('Product updated!')
      setEditingId(null)
      setEditForm({})
    } else {
      toast.error('Update failed')
    }
  }

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await axios.patch(`/api/admin/orders/${id}`, { status })
      toast.success(`Order marked as ${status}`)
      const res = await axios.get('/api/admin/orders', { timeout: 1000 })
      setOrders(res.data.data)
    } catch {
      toast.error('Status update failed — backend offline')
    }
  }

  const saveSettings = (e) => {
    e.preventDefault()
    localStorage.setItem('nalamvaazha_settings', JSON.stringify(sData))
    toast.success('Settings saved!')
    // Try API in background — don't block UI
    axios.put('/api/admin/settings', sData, { timeout: 1000 }).catch(() => {})
  }

  // ── Render Sections ──────────────────────────────────────

  const renderDashboard = () => (
    <div className="admin-dashboard animate-fade-in">
      <div className="admin-status-bar">
        <span className={`api-status ${isApiOnline ? 'api-status--online' : 'api-status--offline'}`}>
          {isApiOnline ? 'Backend Online' : 'Offline Mode (Local Data)'}
        </span>
      </div>
      <h3>Overview</h3>
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <h4>Total Products</h4>
          <span className="stat-val">{stats.totalProducts}</span>
        </div>
        <div className="stat-card glass-card">
          <h4>Total Orders</h4>
          <span className="stat-val">{stats.totalOrders}</span>
        </div>
        <div className="stat-card glass-card">
          <h4>Pending Orders</h4>
          <span className="stat-val text-warning">{stats.pendingOrders}</span>
        </div>
        <div className="stat-card glass-card">
          <h4>Out of Stock</h4>
          <span className="stat-val text-error">{stats.outOfStock}</span>
        </div>
      </div>

      <h3 style={{ marginTop: '40px' }}>Recent Orders</h3>
      <div className="orders-table-wrapper glass-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.customer.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.grandTotal}</td>
                <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-ghost" onClick={() => setActiveTab('orders')}>View</button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan="6" className="text-center" style={{ padding: '40px', color: 'var(--text-hint)' }}>No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="admin-products animate-fade-in">
      <div className="admin-grid">
        <div className="upload-section glass-card">
          <h3>Add New Product</h3>
          <form onSubmit={handleUpload} className="admin-form">
            <div className="form-group"><label className="form-label">Product Name *</label><input type="text" className="form-input" required value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} /></div>
            <div className="flex-group">
              <div className="form-group"><label className="form-label">Category *</label><select className="form-select" value={prodForm.category} onChange={e => setProdForm({...prodForm, category: e.target.value})}>
                {categories.map(c => <option key={c._id || c.slug} value={c._id || c.slug}>{c.name}</option>)}
              </select></div>
              <div className="form-group"><label className="form-label">Price (₹) *</label><input type="number" className="form-input" required value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} /></div>
            </div>
            <div className="flex-group">
              <div className="form-group"><label className="form-label">Stock *</label><input type="number" className="form-input" required value={prodForm.stock} onChange={e => setProdForm({...prodForm, stock: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Sale Price (₹)</label><input type="number" className="form-input" value={prodForm.salePrice} onChange={e => setProdForm({...prodForm, salePrice: e.target.value})} /></div>
            </div>
            <div className="form-group">
              <label className="form-label">Product Image *</label>
              <div
                className="image-upload-area"
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, setProdForm, 'image')}
                onClick={() => document.getElementById('prod-img-input').click()}
              >
                {prodForm.image ? (
                  <div className="image-upload-preview">
                    <img src={prodForm.image} alt="Preview" />
                    <button type="button" className="image-upload-remove" onClick={e => { e.stopPropagation(); setProdForm({...prodForm, image: ''}) }}>Remove</button>
                  </div>
                ) : (
                  <div className="image-upload-placeholder">
                    <span className="image-upload-icon">📷</span>
                    <p>Click to upload or drag & drop</p>
                    <span className="image-upload-hint">PNG, JPG up to 5MB</span>
                  </div>
                )}
                <input
                  id="prod-img-input"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={e => handleImageFile(e.target.files[0], setProdForm, 'image')}
                />
              </div>
            </div>
            <div className="form-group"><label className="form-label">Description *</label><textarea className="form-textarea" required value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})}></textarea></div>
            <button type="submit" className="btn btn-primary w-full" disabled={!prodForm.image}>Upload Product</button>
          </form>
        </div>
        <div className="product-list-section">
          <h3 style={{ marginBottom: '24px' }}>Product Catalog ({products.length})</h3>
          <div className="admin-items">
            {products.map(p => (
              <div key={getProductId(p)} className="admin-item-card glass-card">
                <img src={p.images?.[0]?.url || p.image || ''} alt={p.name} className="admin-item-img" />
                <div className="admin-item-info">
                  <h4>{p.name} {p.stock === 0 && <span className="text-error" style={{fontSize: 12}}>(Out of Stock)</span>}</h4>
                  <p className="admin-item-meta">{p.category?.name || 'Uncategorized'} • ₹{p.price}</p>
                </div>
                <button className="btn btn-sm" style={{marginRight: 8}} onClick={() => handleTogglePublish(getProductId(p))}>
                  {p.isPublished === false ? 'Publish' : 'Unpublish'}
                </button>
                <button className="delete-btn" title="Delete" onClick={() => handleDeleteProduct(getProductId(p))}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderEditProducts = () => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(editSearch.toLowerCase()) ||
      (p.category?.name || '').toLowerCase().includes(editSearch.toLowerCase())
    )

    return (
      <div className="admin-edit-products animate-fade-in">
        <div className="edit-products-header">
          <h3>All Products ({products.length})</h3>
          <div className="edit-search-box">
            <input
              type="text"
              className="form-input"
              placeholder="Search products..."
              value={editSearch}
              onChange={e => setEditSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state-small">No products found.</div>
        ) : (
          <div className="edit-products-list">
            {filtered.map(p => (
              <div key={getProductId(p)} className={`edit-product-card glass-card ${editingId === getProductId(p) ? 'edit-product-card--editing' : ''}`}>
                {editingId === getProductId(p) ? (
                  <div className="edit-product-form">
                    <div className="edit-product-form__top">
                      <img src={editForm.image || ''} alt={editForm.name} className="edit-product-img" />
                      <div className="edit-product-form__fields">
                        <div className="form-group">
                          <label className="form-label">Product Name</label>
                          <input type="text" className="form-input" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                        </div>
                        <div className="edit-product-form__row">
                          <div className="form-group">
                            <label className="form-label">Category</label>
                            <select className="form-select" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                              {categories.map(c => <option key={c._id || c.slug} value={c._id || c.slug}>{c.name}</option>)}
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Price (₹)</label>
                            <input type="number" className="form-input" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Sale Price (₹)</label>
                            <input type="number" className="form-input" value={editForm.salePrice} onChange={e => setEditForm({...editForm, salePrice: e.target.value})} placeholder="Optional" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Stock</label>
                            <input type="number" className="form-input" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: e.target.value})} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Product Image</label>
                          <div
                            className="image-upload-area image-upload-area--sm"
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => handleDrop(e, setEditForm, 'image')}
                            onClick={() => document.getElementById('edit-img-input').click()}
                          >
                            {editForm.image ? (
                              <div className="image-upload-preview image-upload-preview--sm">
                                <img src={editForm.image} alt="Preview" />
                                <span className="image-upload-change">Change</span>
                              </div>
                            ) : (
                              <div className="image-upload-placeholder">
                                <span className="image-upload-icon">📷</span>
                                <p>Click to upload</p>
                              </div>
                            )}
                            <input
                              id="edit-img-input"
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={e => handleImageFile(e.target.files[0], setEditForm, 'image')}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <textarea className="form-textarea" rows={2} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                        </div>
                      </div>
                    </div>
                    <div className="edit-product-form__actions">
                      <button className="btn btn-primary" onClick={() => handleSaveEdit(getProductId(p))}>Save Changes</button>
                      <button className="btn btn-ghost btn-dark" onClick={cancelEditing}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="edit-product-view">
                    <img src={p.images?.[0]?.url || p.image || ''} alt={p.name} className="edit-product-img" />
                    <div className="edit-product-info">
                      <h4 className="edit-product-name">{p.name}</h4>
                      <p className="edit-product-meta">
                        <span className="edit-product-category">{p.category?.name || 'Uncategorized'}</span>
                        {p.stock === 0 && <span className="badge badge-outofstock">Out of Stock</span>}
                        {p.stock > 0 && p.stock <= 10 && <span className="badge badge-limited">Low Stock: {p.stock}</span>}
                      </p>
                    </div>
                    <div className="edit-product-price-col">
                      <span className="edit-product-price">₹{p.price}</span>
                      {p.salePrice > 0 && <span className="edit-product-sale">₹{p.salePrice}</span>}
                    </div>
                    <div className="edit-product-stock-col">
                      <span className="edit-product-stock-label">Stock</span>
                      <span className="edit-product-stock-val">{p.stock}</span>
                    </div>
                    <div className="edit-product-actions">
                      <button className="btn btn-sm btn-secondary" onClick={() => startEditing(p)}>Edit</button>
                      <button className="delete-btn" title="Delete" onClick={() => handleDeleteProduct(getProductId(p))}>🗑️</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderOrders = () => (
    <div className="admin-orders animate-fade-in">
      <h3>Manage Orders</h3>
      {orders.length === 0 ? (
        <div className="empty-state-small" style={{ marginTop: '20px' }}>
          {isApiOnline ? 'No orders yet.' : 'Orders require backend server to be running.'}
        </div>
      ) : (
        <div className="orders-table-wrapper glass-card" style={{ marginTop: '20px' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.customer.name}</td>
                  <td>{order.customer.phone}</td>
                  <td>₹{order.grandTotal}</td>
                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      style={{ padding: '6px', fontSize: '14px', width: 'auto' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => alert(JSON.stringify(order.items, null, 2))}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="admin-settings animate-fade-in">
      <div className="upload-section glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3>Store Settings</h3>
        <form className="admin-form" onSubmit={saveSettings}>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input type="text" className="form-input" value={sData.businessName} onChange={e => setSData({...sData, businessName: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">WhatsApp Number (With Country Code)</label>
            <input type="text" className="form-input" value={sData.whatsappNumber} onChange={e => setSData({...sData, whatsappNumber: e.target.value})} placeholder="919876543210" />
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Charge (₹)</label>
            <input type="number" className="form-input" value={sData.deliveryCharge} onChange={e => setSData({...sData, deliveryCharge: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary w-full">Save Settings</button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="admin-page" style={{ paddingBottom: '100px' }}>
      <header className="page-hero">
        <div className="container">
          <span className="badge badge-featured" style={{ marginBottom: 16 }}>Management</span>
          <h1>Admin <span className="text-lime">Portal</span></h1>

          <div className="admin-tabs">
            {['dashboard', 'products', 'edit products', 'orders', 'settings'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="section container" style={{ paddingTop: '40px' }}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'edit products' && renderEditProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'settings' && renderSettings()}
      </section>
    </div>
  )
}
