import { FC, ReactElement, useState, useEffect } from 'react'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import productService, { Product } from '../api/productService'
import '../styles/screens.css'

const Home: FC = (): ReactElement => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts()
      setFeaturedProducts(data.slice(0, 8))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
      setError(errorMessage)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="screen home-screen">
      <div className="screen-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome to MyApp</h1>
            <p className="welcome-subtitle">Discover amazing products and great deals</p>
            <button className="btn btn-primary welcome-btn">Shop Now</button>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose Us</h2>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3>Browse Products</h3>
              <p>Explore our wide range of products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Manage Cart</h3>
              <p>Add items to your cart and checkout</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Track Orders</h3>
              <p>View your order history and status</p>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="featured-products-section">
          <h2>Featured Products</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchProducts} />
          ) : (
            <div className="products-scroll-container">
              <div className="products-scroll">
                {featuredProducts.map(product => (
                  <div key={product.id} className="featured-product-card">
                    <div className="product-emoji">{product.image}</div>
                    <h3>{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <p className="product-price">{product.price}</p>
                    <button className="btn btn-secondary">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
