import { render, screen } from '@testing-library/react'
import Loader from '../../components/Loader'

describe('Loader Component', () => {
  test('renders loader container', () => {
    render(<Loader />)
    const loaderContainer = screen.getByText('Loading products...')
    expect(loaderContainer).toBeInTheDocument()
  })

  test('renders spinner element', () => {
    const { container } = render(<Loader />)
    const spinner = container.querySelector('.spinner')
    expect(spinner).toBeInTheDocument()
  })

  test('has correct styling classes', () => {
    const { container } = render(<Loader />)
    const loaderContainer = container.querySelector('.loader-container')
    expect(loaderContainer).toHaveClass('loader-container')
  })
})
