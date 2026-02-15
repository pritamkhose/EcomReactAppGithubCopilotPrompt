import productService from '../../api/productService'
import axiosClient from '../../api/axiosClient'

jest.mock('../../api/axiosClient')

describe('Product Service', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Laptop',
      price: '999',
      description: 'High performance laptop',
      image: '💻',
    },
    {
      id: 2,
      name: 'Phone',
      price: '699',
      description: 'Smartphone',
      image: '📱',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches products successfully', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { products: mockProducts },
    })

    const products = await productService.getProducts()

    expect(products).toEqual(mockProducts)
  })

  test('returns array of products', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { products: mockProducts },
    })

    const products = await productService.getProducts()

    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBe(2)
  })

  test('products have required properties', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { products: mockProducts },
    })

    const products = await productService.getProducts()

    products.forEach(product => {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('description')
    })
  })

  test('product names are strings', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { products: mockProducts },
    })

    const products = await productService.getProducts()

    products.forEach(product => {
      expect(typeof product.name).toBe('string')
      expect(product.name.length).toBeGreaterThan(0)
    })
  })

  test('handles API error gracefully', async () => {
    ;(axiosClient.get as jest.Mock).mockRejectedValue(new Error('Network Error'))

    const products = await productService.getProducts()

    expect(products).toBeDefined()
  })

  test('handles empty product list', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { products: [] },
    })

    const products = await productService.getProducts()

    expect(products.length).toBe(0)
  })
})
