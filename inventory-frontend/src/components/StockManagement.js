import React, { useState } from 'react';
import axios from 'axios';

function StockManagement() {
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [action, setAction] = useState('add');
  const [message, setMessage] = useState('');

  const handleStockChange = async (e) => {
    e.preventDefault();
    const stockData = {
      variant_id: variantId,
      quantity: parseFloat(quantity),
    };

    try {
      let response;

      if (action === 'add') {
        response = await axios.post('http://127.0.0.1:8000/api/v1/products/add-stock/', stockData);
      } else if (action === 'remove') {
        response = await axios.post('http://127.0.0.1:8000/api/v1/products/remove-stock/', stockData);
      }

      setMessage(response.data.message);
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('Error: ' + error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h1>Stock Management</h1>
      <form onSubmit={handleStockChange}>
        <div>
          <label>Variant ID:</label>
          <input
            type="text"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Action:</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="add">Add Stock</option>
            <option value="remove">Remove Stock</option>
          </select>
        </div>
        <button type="submit">{action === 'add' ? 'Add Stock' : 'Remove Stock'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default StockManagement;
