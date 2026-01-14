import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../../components/Footer'

const FooterWithRouter = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
)

describe('Footer Component', () => {
  test('renders footer element', () => {
    render(<FooterWithRouter />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  test('renders footer sections', () => {
    render(<FooterWithRouter />)
    expect(screen.getByText(/About/i)).toBeInTheDocument()
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument()
  })

  test('renders copyright text with current year', () => {
    render(<FooterWithRouter />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  test('renders footer links', () => {
    render(<FooterWithRouter />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  test('renders social media icons', () => {
    render(<FooterWithRouter />)
    const socialIcons = screen.queryAllByRole('link')
    expect(socialIcons.length).toBeGreaterThan(0)
  })
})
