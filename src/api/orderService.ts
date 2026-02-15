import axiosClient from './axiosClient'
import ordersData from '../../public/data/orders.json'

const ORDERS_API_URL = '/data/orders.json'
export interface OrderItem {
  productId: number
  name: string
  quantity: number
  price: string
}

export interface Order {
  id: string
  date: string
  status: 'Delivered' | 'In Transit' | 'Processing'
  total: string
  items: OrderItem[]
}

export interface OrdersResponse {
  orders: Order[]
}

const orderService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await axiosClient.get<OrdersResponse>(ORDERS_API_URL)
      return response.data.orders
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      return ordersData.orders
    }
  },
}

export default orderService
