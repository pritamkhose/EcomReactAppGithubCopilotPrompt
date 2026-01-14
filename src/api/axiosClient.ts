import axios, { AxiosInstance } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request)
    } else {
      // Error in request setup
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosClient
