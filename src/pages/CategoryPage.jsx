import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const { getByCategory, categories } = useProducts()
  
  const category = categories.find(c => c.slug === categoryId)
  const products = getByCategory(categoryId)

  if (!category) {
    return (
      <div className="section container">
        <div className="empty-state">
          <span className="icon">❓</span>
          <h3>Category not found</h3>
          <p>The category you are looking for doesn't exist.</p>
          <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <header className="page-hero" style={{ backgroundColor: 'var(--cream-2)' }}>
        <div className="container">
          <Link to="/shop" className="btn btn-ghost btn-sm" style={{ marginBottom: '20px' }}>
            ← Back to Shop
          </Link>
          <span className="badge badge-featured">Authentic</span>
          <h1>{category.name}</h1>
          <p>{category.description || `Browse our collection of ${category.name}`}</p>
        </div>
      </header>

      <section className="section container">
        <div className="section-header">
          <h2>Our <span className="text-lime">{category.name}</span> Range</h2>
          <p>Hand-picked and traditionally prepared just for you.</p>
        </div>

        {products.length > 0 ? (
          <div className="products-grid animate-fade-in">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state animate-fade-in">
            <span className="icon">🥢</span>
            <h3>No products in this category yet</h3>
            <p>Our artisans are busy preparing fresh batches. Check back soon!</p>
            <Link to="/shop" className="btn btn-secondary">Explore Other Categories</Link>
          </div>
        )}
      </section>
    </div>
  )
}
