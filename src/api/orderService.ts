import axiosClient from './axiosClient'
import ordersData from '../data/orders.json'

const ORDERS_API_URL =
  'https://firebasestorage.googleapis.com/v0/b/node-pritam.appspot.com/o/orders.json?alt=media'

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
