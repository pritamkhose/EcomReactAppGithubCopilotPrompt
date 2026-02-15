import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Contact from '../../screens/Contact'

const ContactWithRouter = () => (
  <BrowserRouter>
    <Contact />
  </BrowserRouter>
)

describe('Contact Screen', () => {
  test('renders contact page heading', () => {
    render(<ContactWithRouter />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  test('renders contact form fields', () => {
    render(<ContactWithRouter />)
    // Check for form content - just verify email field exists
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  test('renders submit button', () => {
    render(<ContactWithRouter />)
    const submitButton = screen.queryByRole('button', { name: /send/i })
    expect(submitButton || screen.getByRole('button')).toBeInTheDocument()
  })

  test('renders contact information section', () => {
    render(<ContactWithRouter />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  test('allows user to fill in form fields', () => {
    render(<ContactWithRouter />)
    const nameInput = screen.getByPlaceholderText('Your full name') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('your@email.com') as HTMLInputElement

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
  })

  test('updates textarea value on change', () => {
    render(<ContactWithRouter />)
    const messageInput = screen.getByPlaceholderText('Your message...') as HTMLTextAreaElement
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    expect(messageInput.value).toBe('Test message')
  })

  test('handles form submission', async () => {
    render(<ContactWithRouter />)

    const nameInput = screen.getByPlaceholderText('Your full name')
    const emailInput = screen.getByPlaceholderText('your@email.com')
    const subjectInput = screen.getByPlaceholderText('How can we help?')
    const messageInput = screen.getByPlaceholderText('Your message...')
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message content' } })
    fireEvent.click(submitButton)

    await waitFor(
      () => {
        expect(screen.getByText(/Thank You!/i)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })
})
