import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantStyle.css';
import menuData from './restaurantData.json';

export const RestaurantMenu = () => {
  const rest_id = 1;
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null); // State to hold item being edited

  useEffect(() => {
    // Filter menu items based on rest_id
    const filteredMenuItems = menuData.restaurant_menu.find(
      (restaurant) => restaurant.rest_id === rest_id
    );
    if (filteredMenuItems) {
      setMenuItems(filteredMenuItems.menu_items);
    } else {
      setMenuItems([]); // Set empty array if no matching restaurant found
    }
  }, [rest_id]);

  const handleStatusUpdate = (itemId, newStatus) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.fd_id === itemId ? { ...item, fd_status: newStatus } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const handleDelete = (itemId) => {
    const updatedMenuItems = menuItems.filter((item) => item.fd_id !== itemId);
    setMenuItems(updatedMenuItems);
  };

  const handleEdit = (itemId) => {
    const itemToEdit = menuItems.find((item) => item.fd_id === itemId);
    setEditItem(itemToEdit);
  };

  const handleEditSave = (updatedItem) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.fd_id === updatedItem.fd_id ? { ...item, ...updatedItem } : item
    );
    setMenuItems(updatedMenuItems);
    setEditItem(null); // Clear edit state after saving
  };

  return (
    <div className="container">
      <h1>Restaurant Menu</h1>
      <nav>
        <ul className="menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/">Order History</Link></li>
          <li><Link to="/">Ongoing Orders</Link></li>
        </ul>
      </nav>
      <table className="menu-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr
              key={item.fd_id}
              className={item.fd_status === 'available' ? 'available-row' : 'sold-out-row'}
            >
              <td>{item.fd_id}</td>
              <td>{item.fd_name}</td>
              <td>${item.fd_price.toFixed(2)}</td>
              <td>{item.fd_weight} g</td>
              <td>{item.fd_desc}</td>
              <td>
                <select
                  value={item.fd_status}
                  onChange={(e) => handleStatusUpdate(item.fd_id, e.target.value)}
                >
                  <option value="available">Available</option>
                  <option value="sold-out">Sold Out</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(item.fd_id)}>Delete</button>
                <button onClick={() => handleEdit(item.fd_id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Card Component */}
      {editItem && (
        <EditMenuItem item={editItem} onSave={handleEditSave} onCancel={() => setEditItem(null)} />
      )}
    </div>
  );
};

// EditMenuItem Component
const EditMenuItem = ({ item, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <div className="edit-card">
      <h2>Edit Item: {editedItem.fd_name}</h2>
      <label>Name:</label>
      <input type="text" name="fd_name" value={editedItem.fd_name} onChange={handleInputChange} />
      <label>Price:</label>
      <input type="text" name="fd_price" value={editedItem.fd_price} onChange={handleInputChange} />
      <label>Weight:</label>
      <input type="text" name="fd_weight" value={editedItem.fd_weight} onChange={handleInputChange} />
      <label>Description:</label>
      <textarea name="fd_desc" value={editedItem.fd_desc} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
