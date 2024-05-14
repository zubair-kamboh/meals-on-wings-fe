import React from 'react';
import logo from './logo.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRouteProps } from './types/types';
import { Layout } from './layouts/layout';
import { Menu } from './pages/menu/menu';

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
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
