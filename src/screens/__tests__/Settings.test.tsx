import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Settings from '../../screens/Settings'

const SettingsWithRouter = () => (
  <BrowserRouter>
    <Settings />
  </BrowserRouter>
)

describe('Settings Screen', () => {
  test('renders settings page heading', () => {
    render(<SettingsWithRouter />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  test('renders all form fields', () => {
    render(<SettingsWithRouter />)
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Street Address')).toBeInTheDocument()
  })

  test('renders form preferences sections', () => {
    render(<SettingsWithRouter />)
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
    expect(screen.getByText('Newsletter Subscription')).toBeInTheDocument()
  })

  test('renders save button', () => {
    render(<SettingsWithRouter />)
    const saveButton = screen.getByRole('button', { name: /save/i })
    expect(saveButton).toBeInTheDocument()
  })

  test('allows user to input form data', () => {
    render(<SettingsWithRouter />)
    const nameInput = screen.getByPlaceholderText('Your Name') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('your@email.com') as HTMLInputElement

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
  })

  test('renders notification preferences section', () => {
    render(<SettingsWithRouter />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })
})
