import React from 'react'
import logo from './logo.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRouteProps } from './types/types'
import { Layout } from './layouts/layout'
import { Menu } from './pages/menu/menu'
import { RestaurantHome } from './pages/restaurant/RestaurantHome'
import { Checkout } from './pages/checkout/checkout'
import MenuManagement from './pages/restaurant/MenuManagement'
import AddMenuItem from './pages/restaurant/AddMenuItem'
import EditMenuItem from './pages/restaurant/EditMenuItem'
import OrderHistory from './pages/restaurant/OrderHistory'
import OngoingOrders from './pages/restaurant/OngoingOrders'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <Layout>{children}</Layout>
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<RestaurantHome />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/add-menu-item" element={<AddMenuItem />} />
          <Route path="/edit-menu-item/:id" element={<EditMenuItem />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/ongoing-orders" element={<OngoingOrders />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
