import { Link } from 'react-router-dom'

export default function AboutUsPage() {
  return (
    <div className="about-page">
      <header className="page-hero">
        <div className="container">
          <span className="badge badge-saffron">Our Journey</span>
          <h1>Traditional <span className="text-gradient">Roots</span></h1>
          <p>The story of HomeFresh and our commitment to authentic homemade food.</p>
        </div>
      </header>

      <section className="section container">
        <div className="section-header">
          <h2>The <span className="text-gradient">HomeFresh Story</span></h2>
          <p>Founded on a simple belief: Good food starts at home.</p>
        </div>

        <div className="about-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="about-text">
            <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '24px' }}>
              HomeFresh began in a small kitchen in Chennai, where our founder set out to share the aromatic, handcrafted flavours of home-cooked meals with families who missed that authentic touch.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '24px' }}>
              We believe that traditional recipes are more than just food; they are a heritage of love, patience and pure ingredients. That's why every product we sell is made in small batches, by hand, without any artificial additives or preservatives.
            </p>
            <div className="about-stats" style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--saffron)' }}>100%</h3>
                <p style={{ fontWeight: '600', color: 'var(--dark)' }}>Homemade</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--saffron)' }}>50+</h3>
                <p style={{ fontWeight: '600', color: 'var(--dark)' }}>Recipes</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--saffron)' }}>0</h3>
                <p style={{ fontWeight: '600', color: 'var(--dark)' }}>Preservatives</p>
              </div>
            </div>
          </div>
          <div className="about-image-wrap">
            <img 
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80" 
              alt="Handmade Food" 
              style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
        </div>
      </section>

      <section className="section bg-cream-2">
        <div className="container text-center" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '40px' }}>Our <span className="text-gradient">Values</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '20px' }}>👵</span>
              <h3 style={{ marginBottom: '16px' }}>Heritage Recipes</h3>
              <p style={{ color: 'var(--gray)' }}>Following authentic methods passed down through families for generations.</p>
            </div>
            <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '20px' }}>🌿</span>
              <h3 style={{ marginBottom: '16px' }}>Pure & Natural</h3>
              <p style={{ color: 'var(--gray)' }}>Sourcing the finest local ingredients and spices for genuine flavour.</p>
            </div>
            <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '20px' }}>❤️</span>
              <h3 style={{ marginBottom: '16px' }}>Handcrafted Love</h3>
              <p style={{ color: 'var(--gray)' }}>Small batch production ensures every pack meets our high quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>Ready to <span className="text-gradient">Taste the Difference?</span></h2>
        <p style={{ marginBottom: '40px', color: 'var(--gray)', fontSize: '1.2rem' }}>Experience authentic homemade goodness delivered to your home.</p>
        <Link to="/shop" className="btn btn-primary btn-lg">Shop Our Collection</Link>
      </section>
    </div>
  )
}
