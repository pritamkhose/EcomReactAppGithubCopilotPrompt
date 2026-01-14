import { FC, ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navigation.css'

const Navigation: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = (): void => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            MyApp
          </Link>
        </h1>

        {/* Hamburger Menu Icon */}
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" onClick={closeMenu}>
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link" onClick={closeMenu}>
              Orders
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/settings" className="nav-link" onClick={closeMenu}>
              Settings
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
