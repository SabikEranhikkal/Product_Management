import React, { useState } from 'react';
import { addStock, removeStock } from './ProductService';

const StockManagement = () => {
  const [productId, setProductId] = useState('');
  const [stockAmount, setStockAmount] = useState(0);

  const handleAddStock = async () => {
    await addStock({ product_id: productId, stock_amount: stockAmount });
    alert('Stock added successfully!');
  };

  const handleRemoveStock = async () => {
    await removeStock({ product_id: productId, stock_amount: stockAmount });
    alert('Stock removed successfully!');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock Amount"
        value={stockAmount}
        onChange={(e) => setStockAmount(e.target.value)}
      />
      <button onClick={handleAddStock}>Add Stock</button>
      <button onClick={handleRemoveStock}>Remove Stock</button>
    </div>
  );
};

export default StockManagement;
