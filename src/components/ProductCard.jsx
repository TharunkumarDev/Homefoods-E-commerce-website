import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=60'
          }}
        />
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        {product.isAdmin && (
          <span className="product-card__badge product-card__badge--admin">New Upload</span>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category.replace(/-/g, ' ')}</p>
        <h3 className="product-card__name">{product.name}</h3>
        {product.unit && (
          <p className="product-card__unit">{product.unit}</p>
        )}
        <div className="product-card__footer">
          <p className="product-card__price">₹{product.price}</p>
          <button
            className="btn btn-primary btn-sm product-card__add-btn"
            onClick={() => addItem(product)}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  )
}
