import { useState, useMemo } from 'react'
import { useProducts } from '../context/ProductContext'
import { CATEGORIES } from '../data/categories'
import ProductCard from '../components/ProductCard'
import './ShopPage.css'

export default function ShopPage() {
  const { allProducts } = useProducts()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [allProducts, activeCategory, searchQuery])

  return (
    <div className="shop-page">
      <header className="page-hero">
        <div className="container">
          <span className="badge badge-saffron">Fresh & Healthy</span>
          <h1>Our Full <span className="text-gradient">Collection</span></h1>
          <p>Explore all our homemade delicacies in one place.</p>
        </div>
      </header>

      <section className="section shop-content">
        <div className="container">
          {/* Controls */}
          <div className="shop-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-filters">
              <button
                className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Products
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="shop-results-info">
            <p>Showing <strong>{filteredProducts.length}</strong> products</p>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid animate-fade-in">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state animate-fade-in">
              <span className="icon">🥡</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or category filter.</p>
              <button className="btn btn-primary" onClick={() => { setActiveCategory('all'); setSearchQuery('') }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
