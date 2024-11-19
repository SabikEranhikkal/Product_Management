import React from 'react';
import ProductList from './components/ProductList';
import StockManagement from './components/StockManagement';  // Import from components folder
import CreateProduct from './components/CreateProduct';
import Inventory from './components/product';

function App() {
  return (
    <div className="App">
      <Inventory />
      <CreateProduct />
      <ProductList />
      <StockManagement />
    </div>
  );
}

export default App;
