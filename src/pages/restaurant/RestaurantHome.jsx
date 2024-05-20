import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if using React Router
import './RestaurantStyle.css';

export const RestaurantHome=()=>{
  console.log("RestaurantHome component is rendered");
  return (
    <div className="container">
      <h1>Restaurant Home</h1>
      <nav>
        <ul className="menu">
        <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/">Order History</Link></li>
          <li><Link to="/orders">Ongoing Orders</Link></li>        
        </ul>
      </nav>
    </div>
  );
}