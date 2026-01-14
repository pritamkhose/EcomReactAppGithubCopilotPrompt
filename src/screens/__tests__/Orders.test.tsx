import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Orders from '../../screens/Orders'
import * as orderService from '../../api/orderService'

jest.mock('../../api/orderService')

const OrdersWithRouter = () => (
  <BrowserRouter>
    <Orders />
  </BrowserRouter>
)

describe('Orders Screen', () => {
  const mockOrders = [
    {
      id: '1',
      status: 'Delivered',
      date: '2024-01-01',
      total: '999',
      items: [
        {
          productId: 1,
          name: 'Laptop',
          quantity: 1,
          price: '999'
        }
      ]
    },
    {
      id: '2',
      status: 'Processing',
      date: '2024-01-02',
      total: '1398',
      items: [
        {
          productId: 2,
          name: 'Phone',
          quantity: 2,
          price: '699'
        }
      ]
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders orders page heading', async () => {
    ;(orderService.default.getOrders as jest.Mock).mockResolvedValue(mockOrders)
    render(<OrdersWithRouter />)

    await waitFor(() => {
      expect(screen.getByText('Order History')).toBeInTheDocument()
    })
  })

  test('displays loading spinner initially', () => {
    ;(orderService.default.getOrders as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<OrdersWithRouter />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  test('displays error message on fetch failure', async () => {
    ;(orderService.default.getOrders as jest.Mock).mockRejectedValue(
      new Error('Order Error')
    )
    render(<OrdersWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument()
    })
  })

  test('renders orders after fetch', async () => {
    ;(orderService.default.getOrders as jest.Mock).mockResolvedValue(mockOrders)
    render(<OrdersWithRouter />)

    await waitFor(() => {
      // Check if any order content is rendered
      const statusElement = screen.getByText('Delivered')
      expect(statusElement).toBeInTheDocument()
    })
  })

  test('displays order status badges', async () => {
    ;(orderService.default.getOrders as jest.Mock).mockResolvedValue(mockOrders)
    render(<OrdersWithRouter />)

    await waitFor(() => {
      expect(screen.getByText('Delivered')).toBeInTheDocument()
      expect(screen.getByText('Processing')).toBeInTheDocument()
    })
  })
})
