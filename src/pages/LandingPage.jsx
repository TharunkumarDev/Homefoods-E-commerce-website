import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import CategoryCircleCard from '../components/CategoryCircleCard'
import ProductCard from '../components/ProductCard'
import './LandingPage.css'

export default function LandingPage() {
  const { getNewArrivals, getBestSellers, categories } = useProducts()
  const newArrivals = getNewArrivals(8)
  const bestSellers = getBestSellers(4)

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-v3">
        {/* Full-width lime blob on the right */}
        <div className="hero-v3__lime-bg" />
        <div className="hero-v3__pattern" />

        <div className="container hero-v3__inner">
          {/* Left — Text Content */}
          <div className="hero-v3__content">
            <span className="hero-v3__badge">தினந்தோறும் ஆரோக்கியம்</span>

            <h1 className="hero-v3__title">
              GOOD <span className="hero-v3__emoji">🌿</span>TASTE.
              <span className="hero-v3__title-line2">GOOD <span className="hero-v3__emoji">😋</span>HEALTH.</span>
            </h1>

            <p className="hero-v3__desc">
              100% natural, homemade wellness products crafted with traditional recipes — delivered fresh to your family.
            </p>

            <div className="hero-v3__actions">
              <Link to="/shop" className="hero-v3__btn-primary">
                Shop Collection →
              </Link>
              <Link to="/about" className="hero-v3__btn-secondary">
                Our Story
              </Link>
            </div>

            <div className="hero-v3__stats">
              <div className="hero-v3__stat">
                <span className="hero-v3__stat-num">50+</span>
                <span className="hero-v3__stat-label">Products</span>
              </div>
              <div className="hero-v3__stat">
                <span className="hero-v3__stat-num">2000+</span>
                <span className="hero-v3__stat-label">Happy Families</span>
              </div>
              <div className="hero-v3__stat">
                <span className="hero-v3__stat-num">100%</span>
                <span className="hero-v3__stat-label">Natural</span>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hero-v3__visual">
            <div className="hero-v3__blob" />

            <div className="hero-v3__main-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&q=85"
                alt="Traditional Spices & Homemade Foods"
                className="hero-v3__main-img"
              />
            </div>

            {/* Scattered food elements */}
            <img src="https://images.unsplash.com/photo-1509358271058-abbe9ab3e420?w=100&q=80" alt="" className="hero-v3__scatter hero-v3__scatter--1" />
            <img src="https://images.unsplash.com/photo-1599909533601-0e5e3cc0a920?w=100&q=80" alt="" className="hero-v3__scatter hero-v3__scatter--2" />
            <img src="https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=80&q=80" alt="" className="hero-v3__scatter hero-v3__scatter--3" />

            {/* Floating pill cards */}
            <div className="hero-v3__float hero-v3__float--1">
              <span className="hero-v3__float-icon">🥒</span>
              <span className="hero-v3__float-name">Pickles</span>
            </div>
            <div className="hero-v3__float hero-v3__float--2">
              <span className="hero-v3__float-icon">🌶️</span>
              <span className="hero-v3__float-name">Podis</span>
            </div>
            <div className="hero-v3__float hero-v3__float--3">
              <span className="hero-v3__float-icon">🫓</span>
              <span className="hero-v3__float-name">Appalams</span>
            </div>
            <div className="hero-v3__float hero-v3__float--4">
              <span className="hero-v3__float-icon">🍃</span>
              <span className="hero-v3__float-name">Vathal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="section-sm categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by <span className="text-gradient">Category</span></h2>
            <p>Explore our wide range of homemade delicacies</p>
          </div>
          <div className="categories-row">
            {categories.map(cat => (
              <CategoryCircleCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="section best-sellers">
        <div className="container">
          <div className="section-header">
            <div className="section-header__top">
              <h2>Top <span className="text-gradient">Best Sellers</span></h2>
              <Link to="/shop" className="btn btn-ghost btn-dark btn-sm">View All</Link>
            </div>
            <p>Our most loved and frequently bought homemade delicacies</p>
          </div>
          
          <div className="products-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
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
