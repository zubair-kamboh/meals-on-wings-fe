import React from 'react';
import logo from './logo.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRouteProps } from './types/types';
import { Layout } from './layouts/layout';
import { Menu } from './pages/menu/menu';
import {RestaurantHome} from './pages/restaurant/RestaurantHome'
import {RestaurantMenu} from './pages/restaurant/RestaurantMenu'
import {OngoingOrders} from './pages/restaurant/OngoingOrders'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  return  <Layout>{children}</Layout>;
};

function App() {
  return (
    <div className="App" >
          <BrowserRouter>

          <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Menu />             
              </ProtectedRoute>
            }
          /> 
          <Route path="/home" element={<RestaurantHome />} />
          <Route path="/menu" element={<RestaurantMenu />} />
          <Route path="/orders" element={<OngoingOrders/>}/>
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
