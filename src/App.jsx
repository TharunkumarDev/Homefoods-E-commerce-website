import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import LandingPage from './pages/LandingPage'
import ShopPage from './pages/ShopPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import AboutUsPage from './pages/AboutUsPage'
import FAQPage from './pages/FAQPage'
import ContactUsPage from './pages/ContactUsPage'
import AdminPage from './pages/AdminPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router basename="/Homefoods-E-commerce-website/">
          <ScrollToTop />
          <div className="app-container">
            <Navbar />
            <main className="content-wrap">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:categoryId" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
