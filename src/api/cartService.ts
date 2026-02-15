import axiosClient from './axiosClient'
import cartData from '../../public/data/cart.json'

const CART_API_URL = '/data/cart.json'
export interface CartItem {
  id: number
  productId: number
  name: string
  price: string
  quantity: number
  image: string
}

export interface CartResponse {
  cartItems: CartItem[]
}

const cartService = {
  getCartItems: async (): Promise<CartItem[]> => {
    try {
      const response = await axiosClient.get<CartResponse>(CART_API_URL)
      return response.data.cartItems
    } catch (error) {
      console.error('Failed to fetch cart items:', error)
      return cartData.cartItems
    }
  },
}

export default cartService
