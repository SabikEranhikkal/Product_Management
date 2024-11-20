import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        console.log(response.data); // Check if the response is an array
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
