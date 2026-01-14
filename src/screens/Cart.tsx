import { FC, ReactElement, useState, useEffect } from 'react'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import cartService, { CartItem } from '../api/cartService'
import '../styles/screens.css'

const Cart: FC = (): ReactElement => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCartItems = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const data = await cartService.getCartItems()
      setCartItems(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load cart items'
      setError(errorMessage)
      console.error('Error fetching cart items:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + price * item.quantity
    }, 0)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="screen cart-screen">
        <div className="screen-content">
          <ErrorMessage message={error} onRetry={fetchCartItems} />
        </div>
      </div>
    )
  }

  const total = calculateTotal()

  return (
    <div className="screen cart-screen">
      <div className="screen-content">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="cart-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => {
                  const itemPrice = parseFloat(item.price.replace('$', ''))
                  const itemTotal = (itemPrice * item.quantity).toFixed(2)
                  return (
                    <tr key={item.id}>
                      <td>
                        <span className="product-emoji">{item.image}</span>
                        {item.name}
                      </td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${itemTotal}</td>
                      <td>
                        <button className="btn btn-danger btn-sm">Remove</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              <button className="btn btn-success">Proceed to Checkout</button>
            </div>
          </div>
        ) : (
          <p className="empty-message">Your cart is empty</p>
        )}
      </div>
    </div>
  )
}

export default Cart
