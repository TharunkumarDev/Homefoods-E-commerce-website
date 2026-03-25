import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span>🏡</span>
              <span className="footer__logo-name">Home<span>Fresh</span></span>
            </Link>
            <p className="footer__tagline">
              Authentic homemade goodness delivered fresh to your doorstep. Traditional recipes, modern convenience.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-btn" aria-label="Instagram">📸</a>
              <a href="#" className="footer__social-btn" aria-label="Facebook">👍</a>
              <a href="https://wa.me/919999999999" className="footer__social-btn" aria-label="WhatsApp" target="_blank" rel="noreferrer">💬</a>
            </div>
          </div>

          {/* Categories */}
          <div className="footer__col">
            <h4 className="footer__heading">Shop</h4>
            <ul className="footer__links">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop/${cat.id}`} className="footer__link">
                    {cat.emoji} {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="footer__col">
            <h4 className="footer__heading">Info</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/shop" className="footer__link">Shop All</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/faq" className="footer__link">FAQ</Link></li>
              <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__contact-list">
              <li>📞 +91 99999 99999</li>
              <li>📧 hello@homefresh.in</li>
              <li>📍 Chennai, Tamil Nadu</li>
              <li>⏰ Mon–Sat, 9am–7pm</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} HomeFresh. Made with ❤️ in India.</p>
          <p>All products are freshly made at home with love.</p>
        </div>
      </div>
    </footer>
  )
}
