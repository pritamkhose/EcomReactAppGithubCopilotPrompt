import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  test('renders Navigation logo, Home heading and Footer', () => {
    render(<App />)

    // Navigation logo
    const navLogo = screen.queryByRole('link', { name: /MyApp/i })
    expect(navLogo).toBeInTheDocument()

    // Home heading
    const heading = screen.queryByRole('heading', { name: /Welcome to MyApp/i })
    expect(heading).toBeInTheDocument()

    // Footer section
    expect(screen.queryByText(/About Us/i)).toBeInTheDocument()
  })
})
