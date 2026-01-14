import { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer: FC = (): ReactElement => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              MyApp is your trusted platform for quality products and excellent customer service.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#policy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook" className="social-icon">
                f
              </a>
              <a href="#twitter" className="social-icon">
                𝕏
              </a>
              <a href="#instagram" className="social-icon">
                📷
              </a>
              <a href="#linkedin" className="social-icon">
                in
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MyApp. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms of Service</a>
            <span className="divider">|</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#cookies">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
