import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories'
import { useProducts } from '../context/ProductContext'
import CategoryCircleCard from '../components/CategoryCircleCard'
import ProductCard from '../components/ProductCard'
import './LandingPage.css'

export default function LandingPage() {
  const { getNewArrivals } = useProducts()
  const newArrivals = getNewArrivals(8)

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-v2">
        <div className="container hero-v2__inner">
          <div className="hero-v2__content animate-fade-in-up">
            <div className="hero-v2__badge-container">
              <span className="hero-v2__badge">Authentic & Hand-Crafted</span>
            </div>
            <h1 className="hero-v2__title">
              Traditional Taste <br />
              <span className="hero-v2__title-highlight">For Modern Homes</span>
            </h1>
            <p className="hero-v2__desc">
              Experience the genuine soul of South Indian cuisine with our 100% natural, 
              homemade Appalams, Podis, and traditional mixes.
            </p>
            <div className="hero-v2__actions">
              <Link to="/shop" className="hero-v2__btn-primary">Shop Collection</Link>
              <Link to="/about" className="hero-v2__btn-secondary">Learn Our Story</Link>
            </div>
            <div className="hero-v2__trust">
              <span>⭐️⭐️⭐️⭐️⭐️ 2000+ Happy Homemakers</span>
            </div>
          </div>
          
          <div className="hero-v2__image-container animate-fade-in">
            <div className="hero-v2__image-frame">
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&q=80" 
                alt="Traditional Spices" 
                className="hero-v2__image"
              />
              <div className="hero-v2__floating-card hero-v2__floating-card--1 glass-card">
                <span>🥒</span> Pickles
              </div>
              <div className="hero-v2__floating-card hero-v2__floating-card--2 glass-card">
                <span>🌶️</span> Podis
              </div>
              <div className="hero-v2__floating-card hero-v2__floating-card--3 glass-card">
                <span>🫓</span> Appalams
              </div>
            </div>
          </div>
        </div>
        <div className="hero-v2__shape-1"></div>
        <div className="hero-v2__shape-2"></div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by <span className="text-gradient">Category</span></h2>
            <p>Explore our wide range of homemade delicacies</p>
          </div>
          <div className="categories-row">
            {CATEGORIES.map(cat => (
              <CategoryCircleCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="section new-arrivals bg-cream-2">
        <div className="container">
          <div className="section-header">
            <div className="section-header__top">
              <h2>Newly <span className="text-gradient">Added Products</span></h2>
              <Link to="/shop" className="btn btn-ghost btn-dark btn-sm">View All</Link>
            </div>
            <p>Our latest handcrafted additions to the catalog</p>
          </div>
          
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container features__grid">
          <div className="feature-card glass-card">
            <span className="feature-icon">🏠</span>
            <h3>100% Homemade</h3>
            <p>Prepared in small batches at home using traditional recipes passed down through generations.</p>
          </div>
          <div className="feature-card glass-card">
            <span className="feature-icon">🌿</span>
            <h3>Pure Ingredients</h3>
            <p>No preservatives, artificial colors or chemical additives. Just pure, natural goodness.</p>
          </div>
          <div className="feature-card glass-card">
            <span className="feature-icon">✨</span>
            <h3>Authentic Taste</h3>
            <p>Bringing you the genuine local flavours that remind you of your grandmother's kitchen.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
