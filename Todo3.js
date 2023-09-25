
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPassword, setNewItemPassword] = useState('');
  const [newItemEmail, setNewItemEmail] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  const createItem = async () => {
    try {
      await axios.post('http://localhost:3001/items', {
        name: newItemName,
        password: newItemPassword,
        email: newItemEmail,
      });
      fetchItems();
      setNewItemName('');
      setNewItemPassword('');
      setNewItemEmail('');
    } catch (error) {
      console.error('Error creating item', error);
    }
  };

  const updateItem = async () => {
    try {
      await axios.put(`http://localhost:3001/items/${selectedItem._id}`, {
        name: selectedItem.name,
        password: selectedItem.password,
        email: selectedItem.email,
      });
      fetchItems();
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating item', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/items/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <div>
        <h2>Create Item</h2>
        <form onSubmit={createItem}>
          <input
            type="text"
            placeholder="Enter your name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={newItemPassword}
            onChange={(e) => setNewItemPassword(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={newItemEmail}
            onChange={(e) => setNewItemEmail(e.target.value)}
          />
          <br />
          <button type="submit">Add Item</button>
        </form>
      </div>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <div>
                <strong>Name:</strong> {item.name}
              </div>
              <div>
                <strong>Password:</strong> {item.password}
              </div>
              <div>
                <strong>Email:</strong> {item.email}
              </div>
              <button onClick={() => setSelectedItem(item)}>Edit</button>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedItem && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={selectedItem.name}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, name: e.target.value })
            }
          />
          <br />
          <input
            type="password"
            value={selectedItem.password}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, password: e.target.value })
            }
          />
          <br />
          <input
            type="email"
            value={selectedItem.email}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, email: e.target.value })
            }
          />
          <br />
          <button onClick={updateItem}>Update</button>
        </div>
      )}
    </div>
  );
}

export default ItemList;
