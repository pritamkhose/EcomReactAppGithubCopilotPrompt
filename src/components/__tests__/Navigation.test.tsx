import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import userEvent from '@testing-library/user-event'

const userEventClick = userEvent.setup()
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

  test('renders navigation component', () => {
    render(<NavigationWithRouter />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  test('hamburger menu button toggles active class on click', async () => {
    render(<NavigationWithRouter />)
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })
    const navMenu = screen.getByRole('list')

    expect(navMenu).not.toHaveClass('active')
    await userEventClick.click(menuButton)
    expect(navMenu).toHaveClass('active')
    await userEventClick.click(menuButton)
    expect(navMenu).not.toHaveClass('active')
  })

  test('clicking navigation link closes menu', async () => {
    render(<NavigationWithRouter />)
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })
    const homeLink = screen.getByRole('link', { name: /home/i })
    const navMenu = screen.getByRole('list')

    await userEventClick.click(menuButton)
    expect(navMenu).toHaveClass('active')
    await userEventClick.click(homeLink)
    expect(navMenu).not.toHaveClass('active')
  })

  test('renders hamburger menu button', () => {
    render(<NavigationWithRouter />)
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })

  test('renders all navigation links', () => {
    render(<NavigationWithRouter />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument()
    // expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  test('renders hamburger menu button', () => {
    render(<NavigationWithRouter />)
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })
})
