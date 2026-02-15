import axiosClient from './axiosClient'

import product from '../../public/data/products.json'

const PRODUCTS_API_URL = '/data/products.json'

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
