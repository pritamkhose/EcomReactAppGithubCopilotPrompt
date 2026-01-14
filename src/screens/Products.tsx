import { FC, ReactElement, useState, useEffect } from 'react'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import productService, { Product } from '../api/productService'
import '../styles/screens.css'

const Products: FC = (): ReactElement => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts()
      setProducts(data)
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

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="screen products-screen">
        <div className="screen-content">
          <ErrorMessage message={error} onRetry={fetchProducts} />
        </div>
      </div>
    )
  }

  return (
    <div className="screen products-screen">
      <div className="screen-content">
        <h1>Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-emoji">{product.image}</div>
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">{product.price}</p>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
