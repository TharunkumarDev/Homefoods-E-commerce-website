import { Link } from 'react-router-dom'
import './CategoryCircleCard.css'

export default function CategoryCircleCard({ category }) {
  return (
    <Link to={`/shop/${category.id}`} className="cat-card">
      <div
        className="cat-card__circle"
        style={{
          background: `linear-gradient(135deg, ${category.color}22 0%, ${category.color}44 100%)`,
          border: `3px solid ${category.color}55`,
        }}
      >
        <img
          src={category.image}
          alt={category.label}
          className="cat-card__image"
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="cat-card__overlay" style={{ background: `linear-gradient(to top, ${category.color}cc, transparent)` }} />
        <span className="cat-card__emoji">{category.emoji}</span>
      </div>
      <p className="cat-card__label">{category.label}</p>
    </Link>
  )
}
