import { FC, ReactElement } from 'react'
import '../styles/ErrorMessage.css'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onRetry }): ReactElement => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
