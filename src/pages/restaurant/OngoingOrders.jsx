import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantStyle.css';
import { firestore } from './../../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, where, getDoc } from 'firebase/firestore';
import { response } from 'express';

export const OngoingOrders = () => {
  const rest_id = 2; // Restaurant ID (assumed to be constant here)
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const fetchOrders = async () => {
      const queryRef = query(
        collection(firestore, 'orders'),
        orderBy('order_date', 'asc'),
        where('restaurant', '==', `/restaurant_details/${rest_id}`),
        where('order_status', '!=', 'completed')
      );

      const unsubscribe = onSnapshot(queryRef, async (snapshot) => {
        const ordersData = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          const customerDoc = await getDoc(doc(firestore, data.Customer_detaills));
          const restaurantDoc = await getDoc(doc(firestore, data.restaurant));
          const customerData = customerDoc.data();
          const restaurantData = restaurantDoc.data();
          return {
            orderId: docSnapshot.id,
            ...data,
            cust_name: customerData.cust_name,
            location: customerData.location,
            rest_loc: restaurantData.rest_loc
          };
        }));
        setOrders(ordersData);
      });

      return () => unsubscribe();
    };

    fetchOrders();
  }, [rest_id]);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderDocRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderDocRef, { order_status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container">
      <h1>Ongoing Orders</h1>
      <nav>
        <ul className="menu">
          <li><Link to="/reshome">Home</Link></li>
          <li><Link to="/reshome">Order History</Link></li>
          <li><Link to="/resmenu">Restaurant Menu</Link></li>
        </ul>
      </nav>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Location</th>
            <th>Restaurant Location</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.cust_name}</td>
              <td>{order.location}</td>
              <td>{order.rest_loc}</td>
              <td>{order.total_price}</td>
              <td>
                <select value={order.order_status} onChange={e => handleStatusChange(order.orderId, e.target.value)}>
                  <option value="repairing">Repairing</option>
                  <option value="ready-for-delivery">Ready for Delivery</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
