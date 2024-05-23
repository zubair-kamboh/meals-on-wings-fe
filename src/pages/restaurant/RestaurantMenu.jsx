import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantStyle.css';
import { firestore } from './../../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const RestaurantMenu = () => {
  const rest_id = 2;  // Restaurant ID (assumed to be constant here)
  const [menuItems, setMenuItems] = useState([]);  // State to hold menu items
  const [editItem, setEditItem] = useState(null);  // State to hold the item being edited

  // Fetch menu items from Firestore on component mount
  useEffect(() => {
    const queryRef = query(
      collection(firestore, `restaurant_details/${rest_id}/menu_items`),
      orderBy('fd_price', 'asc')
    );

    

    // Subscribe to Firestore changes
    const unsubscribe = onSnapshot(queryRef, {
      next: (response) => {
        const menuItems = response.docs.map(e => ({ menuItemId: e.id, ...e.data() }));
        setMenuItems(menuItems);  // Update state with fetched menu items
      },
      error: (error) => {
        console.log(error);  // Log any errors
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [rest_id]);
  // console.log(menuItems)

  // Handle status update
  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      const itemDocRef = doc(firestore, `restaurant_details/${rest_id}/menu_items`, itemId);
      await updateDoc(itemDocRef, { fd_status: newStatus });

      // Update local state
      const updatedMenuItems = menuItems.map((item) =>
        item.menuItemId === itemId ? { ...item, fd_status: newStatus } : item
      );
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  // Handle item deletion
  const handleDelete = async (itemId) => {
    try {
      const itemDocRef = doc(firestore, `restaurant_details/${rest_id}/menu_items`, itemId);
      await deleteDoc(itemDocRef);

      // Update local state
      const updatedMenuItems = menuItems.filter((item) => item.menuItemId !== itemId);
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  // Set the item to be edited
  const handleEdit = (itemId) => {
    const itemToEdit = menuItems.find((item) => item.menuItemId === itemId);
    setEditItem(itemToEdit);
  };

  // Handle save of edited item
  const handleEditSave = async (updatedItem) => {
    try {
      const itemDocRef = doc(firestore, `restaurant_details/${rest_id}/menu_items`, updatedItem.menuItemId);
      await updateDoc(itemDocRef, updatedItem);

      // Update local state
      const updatedMenuItems = menuItems.map((item) =>
        item.menuItemId === updatedItem.menuItemId ? { ...item, ...updatedItem } : item
      );
      setMenuItems(updatedMenuItems);
      setEditItem(null);
    } catch (error) {
      console.error('Error saving item: ', error);
    }
  };

  return (
    <div className="container">
      <h1>Restaurant Menu</h1>
      <nav>
        <ul className="menu">
          <li><Link to="/reshome">Home</Link></li>
          <li><Link to="/reshome">Order History</Link></li>
          <li><Link to="/resorders">Ongoing Orders</Link></li>
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
              key={item.menuItemId}
              className={item.fd_status === 'available' ? 'available-row' : 'sold-out-row'}
            >
              <td>{item.menuItemId}</td>
              <td>{item.fd_name}</td>
              <td>{typeof item.fd_price === 'number' ? `$${item.fd_price.toFixed(2)}` : 'N/A'}</td>
              <td>{item.fd_weight} g</td>
              <td>{item.fd_desc}</td>
              <td>
                <select
                  value={item.fd_status}
                  onChange={(e) => handleStatusUpdate(item.menuItemId, e.target.value)}
                >
                  <option value="available">Available</option>
                  <option value="sold-out">Sold Out</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(item.menuItemId)}>Delete</button>
                <button onClick={() => handleEdit(item.menuItemId)}>Edit</button>
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure fd_price is updated as a number
    const updatedValue = name === 'fd_price' ? parseFloat(value) : value;
    setEditedItem({ ...editedItem, [name]: updatedValue });
  };

  // Handle save button click
  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <div className="edit-card">
      <h2>Edit Item: {editedItem.fd_name}</h2>
      <label>Name:</label>
      <input type="text" name="fd_name" value={editedItem.fd_name} onChange={handleInputChange} />
      <label>Price:</label>
      <input type="number" name="fd_price" value={editedItem.fd_price} onChange={handleInputChange} />
      <label>Weight:</label>
      <input type="text" name="fd_weight" value={editedItem.fd_weight} onChange={handleInputChange} />
      <label>Description:</label>
      <textarea name="fd_desc" value={editedItem.fd_desc} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
