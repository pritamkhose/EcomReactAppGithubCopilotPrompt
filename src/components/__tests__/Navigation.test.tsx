import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../../components/Navigation'

const NavigationWithRouter = () => (
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
)

describe('Navigation Component', () => {
  test('renders navigation component', () => {
    render(<NavigationWithRouter />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  test('renders logo with correct text', () => {
    render(<NavigationWithRouter />)
    expect(screen.getByText('MyApp')).toBeInTheDocument()
  })

  test('renders all navigation links', () => {
    render(<NavigationWithRouter />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  test('renders hamburger menu button', () => {
    render(<NavigationWithRouter />)
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })
})
