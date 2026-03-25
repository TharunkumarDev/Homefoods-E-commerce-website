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
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__text animate-fade-in-up">
            <span className="badge badge-saffron">Traditional & Homemade</span>
            <h1>Authentic Flavours <br /> <span className="text-gradient">From Our Home To Yours</span></h1>
            <p>Experience the true taste of South India with our handcrafted Appalams, Podis, Pickles and traditional mixes.</p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn-primary btn-lg">Shop Now</Link>
              <Link to="/about" className="btn btn-secondary btn-lg">Our Story</Link>
            </div>
          </div>
          <div className="hero__image-wrap animate-fade-in">
            <div className="hero__image-bg"></div>
            <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80" alt="Authentic Food" className="hero__image" />
          </div>
        </div>
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
