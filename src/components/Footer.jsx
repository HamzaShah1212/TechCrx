import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>TechRx Store provides premium tech products at competitive prices.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Affiliate Disclosure</h4>
          <p>We are Amazon Associates. We earn from qualifying purchases.</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 TechRx Store. All rights reserved.</p>
        <p>
          <a href="#privacy">Privacy Policy</a> | 
          <a href="#terms">Terms of Service</a>
        </p>
      </div>
    </footer>
  )
}
