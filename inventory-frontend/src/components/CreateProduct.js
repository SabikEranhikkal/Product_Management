import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
  const [productName, setProductName] = useState('');
  const [variants, setVariants] = useState([
    { name: '', options: [] }
  ]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the product data
    const productData = {
      ProductName: productName,
      variants: variants
    };

    try {
      // Send POST request to Django API
      const response = await axios.post('http://127.0.0.1:8000/api/v1/products/create/', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('There was an error creating the product!', error);
      setMessage('Error: ' + error.response.data.message);
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { name: '', options: [] }]);
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <h3>Variants</h3>
          {variants.map((variant, index) => (
            <div key={index}>
              <label>Variant Name</label>
              <input
                type="text"
                value={variant.name}
                onChange={(e) => {
                  const updatedVariants = [...variants];
                  updatedVariants[index].name = e.target.value;
                  setVariants(updatedVariants);
                }}
                required
              />
              <label>Options</label>
              <input
                type="text"
                value={variant.options}
                onChange={(e) => {
                  const updatedVariants = [...variants];
                  updatedVariants[index].options = e.target.value.split(',');
                  setVariants(updatedVariants);
                }}
                placeholder="e.g., S,M,L"
                required
              />
            </div>
          ))}

          <button type="button" onClick={handleAddVariant}>
            Add Variant
          </button>
        </div>

        <button type="submit">Create Product</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateProduct;
