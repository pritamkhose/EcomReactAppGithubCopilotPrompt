import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from '../../components/ErrorMessage'

describe('ErrorMessage Component', () => {
  const mockRetry = jest.fn()

  beforeEach(() => {
    mockRetry.mockClear()
  })

  test('renders error message text', () => {
    render(<ErrorMessage message="Failed to load products" onRetry={mockRetry} />)
    expect(screen.getByText('Failed to load products')).toBeInTheDocument()
  })

  test('renders retry button', () => {
    render(<ErrorMessage message="Error occurred" onRetry={mockRetry} />)
    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()
  })

  test('calls onRetry when retry button is clicked', () => {
    render(<ErrorMessage message="Error occurred" onRetry={mockRetry} />)
    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)
    expect(mockRetry).toHaveBeenCalledTimes(1)
  })

  test('renders error container with correct class', () => {
    const { container } = render(
      <ErrorMessage message="Test error" onRetry={mockRetry} />
    )
    const errorContainer = container.querySelector('.error-message')
    expect(errorContainer).toHaveClass('error-message')
  })

  test('displays different error messages', () => {
    const { rerender } = render(
      <ErrorMessage message="Error 1" onRetry={mockRetry} />
    )
    expect(screen.getByText('Error 1')).toBeInTheDocument()

    rerender(<ErrorMessage message="Error 2" onRetry={mockRetry} />)
    expect(screen.getByText('Error 2')).toBeInTheDocument()
  })
})
