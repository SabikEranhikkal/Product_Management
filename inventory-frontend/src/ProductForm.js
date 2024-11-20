import React, { useState } from 'react';
import { createProduct } from './ProductService';

const ProductForm = () => {
  const [product, setProduct] = useState({ ProductName: '', variants: [] });
  const [variant, setVariant] = useState({ name: '', options: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(product);
    alert('Product created successfully!');
  };

  const addVariant = () => {
    setProduct({ ...product, variants: [...product.variants, variant] });
    setVariant({ name: '', options: [] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={product.ProductName}
        onChange={(e) => setProduct({ ...product, ProductName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Variant Name"
        value={variant.name}
        onChange={(e) => setVariant({ ...variant, name: e.target.value })}
      />
      <button type="button" onClick={addVariant}>Add Variant</button>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
