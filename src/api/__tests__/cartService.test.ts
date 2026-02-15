import cartService from '../../api/cartService'
import axiosClient from '../../api/axiosClient'

jest.mock('../../api/axiosClient')

describe('Cart Service', () => {
  const mockCartItems = [
    {
      id: 1,
      productId: 1,
      quantity: 2,
      image: '💻',
      price: '999',
      name: 'Laptop',
    },
    {
      id: 2,
      productId: 2,
      quantity: 1,
      image: '📱',
      price: '699',
      name: 'Phone',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches cart items successfully', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { cartItems: mockCartItems },
    })

    const cartItems = await cartService.getCartItems()

    expect(cartItems).toEqual(mockCartItems)
  })

  test('returns array of cart items', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { cartItems: mockCartItems },
    })

    const cartItems = await cartService.getCartItems()

    expect(Array.isArray(cartItems)).toBe(true)
    expect(cartItems.length).toBe(2)
  })

  test('cart items have required properties', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { cartItems: mockCartItems },
    })

    const cartItems = await cartService.getCartItems()

    cartItems.forEach(item => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('productId')
      expect(item).toHaveProperty('quantity')
      expect(item).toHaveProperty('price')
    })
  })

  test('handles API error gracefully', async () => {
    ;(axiosClient.get as jest.Mock).mockRejectedValue(new Error('API Error'))

    const cartItems = await cartService.getCartItems()

    expect(Array.isArray(cartItems)).toBe(true)
  })

  test('handles empty cart', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { cartItems: [] },
    })

    const cartItems = await cartService.getCartItems()

    expect(cartItems.length).toBe(0)
  })
})
