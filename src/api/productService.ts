import axiosClient from './axiosClient'

import product from '../data/products.json'

const PRODUCTS_API_URL =
  'https://firebasestorage.googleapis.com/v0/b/node-pritam.appspot.com/o/products.json?alt=media&token=72ae566b-b7b2-4bba-94ec-2e9738cf5bef'

export interface Product {
  id: number
  name: string
  price: string
  description: string
  image: string
}

export interface ProductsResponse {
  products: Product[]
}

const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axiosClient.get<ProductsResponse>(PRODUCTS_API_URL)
      return response.data.products
    } catch (error) {
      console.error('Failed to fetch products:', error)
      //   throw error
      return product.products
    }
  },
}

export default productService
