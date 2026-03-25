import { useState } from 'react'

export default function FAQPage() {
  const faqs = [
    {
      q: "Are your products truly homemade?",
      a: "Yes! Every single product in our catalog is prepared in a home kitchen by skilled home chefs who follow traditional recipes. We produce in small batches to ensure absolute freshness and authentic taste."
    },
    {
      q: "Do you use any preservatives?",
      a: "No. We believe in pure, natural food. Our products are made using traditional preservation methods like sun-drying and natural pickling with oils and spices, ensuring they stay fresh naturally."
    },
    {
      q: "How long is the shelf life of your Podis and Appalams?",
      a: "Generally, our Podis have a shelf life of 4-6 months, and sun-dried Appalams/Vathal can last up to 12 months if stored in a cool, dry place in airtight containers. Specific expiry dates are mentioned on each pack."
    },
    {
      q: "How do you deliver orders?",
      a: "We partner with reliable courier services to deliver across India. Within Chennai, we offer faster local delivery options. All orders are packed securely to prevent breakage."
    },
    {
      q: "Can I customize the spice levels of my order?",
      a: "While our standard batches follow consistent recipes, for bulk orders or specific needs, you can contact us via WhatsApp to see if customization is possible for the next batch."
    },
    {
      q: "How do I place an order?",
      a: "Simply add items to your cart and click 'Order via WhatsApp'. This will send your order details directly to us, and we'll confirm the payment and delivery details through chat."
    }
  ]

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-page">
      <header className="page-hero">
        <div className="container">
          <span className="badge badge-saffron">Help Center</span>
          <h1>Frequently Asked <span className="text-gradient">Questions</span></h1>
          <p>Everything you need to know about our products and ordering process.</p>
        </div>
      </header>

      <section className="section container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2>Got <span className="text-gradient">Questions?</span></h2>
          <p>We've gathered answers to the most common queries below.</p>
        </div>

        <div className="faq-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`accordion-item ${openIndex === idx ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            >
              <div className="accordion-header">
                {faq.q}
                <span className="accordion-chevron">▼</span>
              </div>
              <div className="accordion-body">
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer section-sm" style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: 'var(--gray)', marginBottom: '20px' }}>Still have questions?</p>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="btn btn-secondary">
            Chat with us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
