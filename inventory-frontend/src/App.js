import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import StockManagement from './StockManagement';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Product List</Link>
            </li>
            <li>
              <Link to="/create-product">Create Product</Link>
            </li>
            <li>
              <Link to="/manage-stock">Manage Stock</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/manage-stock" element={<StockManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
