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
        <div className="hero-v3__pattern" />
        <div className="hero-v3__glow-1" />
        <div className="hero-v3__glow-2" />

        <div className="container hero-v3__inner">
          <div className="hero-v3__content animate-fade-in-up">
            <span className="hero-v3__badge">தினந்தோறும் ஆரோக்கியம்</span>

            <h1 className="hero-v3__title">
              Nalam Vaazha
              <span className="hero-v3__title-line2">Health & Wellness</span>
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

          <div className="hero-v3__visual">
            <div className="hero-v3__ring" />
            <div className="hero-v3__ring hero-v3__ring--2" />
            <div className="hero-v3__img-grid">
              <div className="hero-v3__img-card hero-v3__img-card--tall">
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80" alt="Traditional Spices" />
                <span className="hero-v3__img-label">Podis & Spices</span>
              </div>
              <div className="hero-v3__img-card">
                <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80" alt="Pickles" />
                <span className="hero-v3__img-label">Pickles</span>
              </div>
              <div className="hero-v3__img-card">
                <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" alt="Appalams" />
                <span className="hero-v3__img-label">Appalams</span>
              </div>
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
