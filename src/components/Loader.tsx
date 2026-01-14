import { FC, ReactElement } from 'react'
import '../styles/Loader.css'

const Loader: FC = (): ReactElement => {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="spinner-circle"></div>
      </div>
      <p className="loader-text">Loading products...</p>
    </div>
  )
}

export default Loader
