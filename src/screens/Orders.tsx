import { FC, ReactElement, useState, useEffect } from 'react'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import orderService, { Order } from '../api/orderService'
import '../styles/screens.css'

const Orders: FC = (): ReactElement => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const data = await orderService.getOrders()
      setOrders(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load orders'
      setError(errorMessage)
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const getStatusClass = (status: string): string => {
    return `status-${status.toLowerCase().replace(' ', '-')}`
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="screen orders-screen">
        <div className="screen-content">
          <ErrorMessage message={error} onRetry={fetchOrders} />
        </div>
      </div>
    )
  }

  return (
    <div className="screen orders-screen">
      <div className="screen-content">
        <h1>Your Orders</h1>
        {orders.length > 0 ? (
          <div className="orders-container">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>{order.id}</h3>
                  <span className={`status ${getStatusClass(order.status)}`}>{order.status}</span>
                </div>
                <div className="order-details">
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Total:</strong> {order.total}
                  </p>
                  <div className="order-items">
                    <strong>Items:</strong>
                    <ul>
                      {order.items.map(item => (
                        <li key={item.productId}>
                          {item.name} x {item.quantity} ({item.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button className="btn btn-primary">View Details</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders
