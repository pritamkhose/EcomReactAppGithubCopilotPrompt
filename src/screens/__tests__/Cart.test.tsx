import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Cart from '../../screens/Cart'
import * as cartService from '../../api/cartService'

jest.mock('../../api/cartService')

const CartWithRouter = () => (
  <BrowserRouter>
    <Cart />
  </BrowserRouter>
)

describe('Cart Screen', () => {
  const mockCartItems = [
    {
      id: 1,
      productId: 1,
      quantity: 2,
      image: '💻',
      price: '999',
      name: 'Laptop'
    },
    {
      id: 2,
      productId: 2,
      quantity: 1,
      image: '📱',
      price: '699',
      name: 'Phone'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders cart page heading', async () => {
    ;(cartService.default.getCartItems as jest.Mock).mockResolvedValue(mockCartItems)
    render(<CartWithRouter />)

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
    })
  })

  test('displays loading spinner initially', () => {
    ;(cartService.default.getCartItems as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<CartWithRouter />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  test('displays error message on fetch failure', async () => {
    ;(cartService.default.getCartItems as jest.Mock).mockRejectedValue(
      new Error('Cart Error')
    )
    render(<CartWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument()
    })
  })

  test('renders cart items after fetch', async () => {
    ;(cartService.default.getCartItems as jest.Mock).mockResolvedValue(mockCartItems)
    render(<CartWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Product/i)).toBeInTheDocument()
    })
  })

  test('displays cart table with items', async () => {
    ;(cartService.default.getCartItems as jest.Mock).mockResolvedValue(mockCartItems)
    render(<CartWithRouter />)

    await waitFor(() => {
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()
    })
  })
})
