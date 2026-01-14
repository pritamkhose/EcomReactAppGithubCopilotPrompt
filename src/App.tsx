import { FC, ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './screens/Home'
import Products from './screens/Products'
import Cart from './screens/Cart'
import Orders from './screens/Orders'
import Settings from './screens/Settings'
import Contact from './screens/Contact'
import './App.css'

const App: FC = (): ReactElement => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
