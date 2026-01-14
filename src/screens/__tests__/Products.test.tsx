import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Products from '../../screens/Products'
import * as productService from '../../api/productService'

jest.mock('../../api/productService')

const ProductsWithRouter = () => (
  <BrowserRouter>
    <Products />
  </BrowserRouter>
)

describe('Products Screen', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Laptop',
      price: '999',
      description: 'High performance laptop',
      image: '💻'
    },
    {
      id: 2,
      name: 'Phone',
      price: '699',
      description: 'Smartphone',
      image: '📱'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders products page heading', async () => {
    ;(productService.default.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    render(<ProductsWithRouter />)

    await waitFor(() => {
      expect(screen.getByText('All Products')).toBeInTheDocument()
    })
  })

  test('displays loading spinner initially', () => {
    ;(productService.default.getProducts as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<ProductsWithRouter />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  test('displays error message on fetch failure', async () => {
    ;(productService.default.getProducts as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )
    render(<ProductsWithRouter />)

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument()
    })
  })

  test('renders products after fetch', async () => {
    ;(productService.default.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    render(<ProductsWithRouter />)

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
    })
  })

  test('displays product prices', async () => {
    ;(productService.default.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    render(<ProductsWithRouter />)

    await waitFor(() => {
      expect(screen.getByText('$999')).toBeInTheDocument()
      expect(screen.getByText('$699')).toBeInTheDocument()
    })
  })
})
