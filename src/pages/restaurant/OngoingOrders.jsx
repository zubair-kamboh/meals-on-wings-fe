import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantStyle.css';
import { firestore } from './../../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const OngoingOrders = () => {
    console.log("Ongoing orders component is rendered");
    return (
      <div className="container">
        <h1>Ongoing Orders</h1>
        <nav>
          <ul className="menu">
          <li><Link to="/home">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/orders">Order History</Link></li>       
          </ul>
        </nav>
      </div>
    );
}