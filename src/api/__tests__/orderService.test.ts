import orderService from '../../api/orderService'
import axiosClient from '../../api/axiosClient'

jest.mock('../../api/axiosClient')

describe('Order Service', () => {
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

  test('fetches orders successfully', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { orders: mockOrders }
    })

    const orders = await orderService.getOrders()

    expect(orders).toEqual(mockOrders)
  })

  test('returns array of orders', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { orders: mockOrders }
    })

    const orders = await orderService.getOrders()

    expect(Array.isArray(orders)).toBe(true)
    expect(orders.length).toBe(2)
  })

  test('orders have required properties', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { orders: mockOrders }
    })

    const orders = await orderService.getOrders()

    orders.forEach(order => {
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('status')
      expect(order).toHaveProperty('items')
    })
  })

  test('validates order statuses', async () => {
    ;(axiosClient.get as jest.Mock).mockResolvedValue({
      data: { orders: mockOrders }
    })

    const orders = await orderService.getOrders()
    const validStatuses = ['Pending', 'Processing', 'Delivered', 'In Transit']

    orders.forEach(order => {
      expect(validStatuses).toContain(order.status)
    })
  })

  test('handles API error gracefully', async () => {
    ;(axiosClient.get as jest.Mock).mockRejectedValue(new Error('API Error'))

    const orders = await orderService.getOrders()

    expect(Array.isArray(orders)).toBe(true)
  })
})
