import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../../screens/Home'
import * as productService from '../../api/productService'

jest.mock('../../api/productService')

const HomeWithRouter = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
)

describe('Home Screen', () => {
  const mockProducts = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: '999',
    description: `Description ${i + 1}`,
    image: '💻'
  }))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders home page heading', async () => {
    ;(productService.default.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    render(<HomeWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
    })
  })

  test('renders loading state initially', () => {
    ;(productService.default.getProducts as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<HomeWithRouter />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  test('displays error message when fetch fails', async () => {
    ;(productService.default.getProducts as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    )
    render(<HomeWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument()
    })
  })

  test('renders featured products after successful fetch', async () => {
    ;(productService.default.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    render(<HomeWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Featured/i)).toBeInTheDocument()
    })
  })
})
