import { Link } from 'react-router-dom'
import './CategoryCircleCard.css'

export default function CategoryCircleCard({ category }) {
  const fallbackColor = '#E68A00'; // Warm orange fallback

  return (
    <Link to={`/shop/${category.slug}`} className="cat-card">
      <div
        className="cat-card__circle"
        style={{
          background: `linear-gradient(135deg, ${fallbackColor}22 0%, ${fallbackColor}44 100%)`,
          border: `3px solid ${fallbackColor}55`,
        }}
      >
        <img
          src={category.image?.url}
          alt={category.name}
          className="cat-card__image"
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="cat-card__overlay" style={{ background: `linear-gradient(to top, ${fallbackColor}cc, transparent)` }} />
      </div>
      <p className="cat-card__label">{category.name}</p>
    </Link>
  )
}
