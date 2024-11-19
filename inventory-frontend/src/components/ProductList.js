import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((response) => setProducts(response.data));
    }, []);

    return (
        <div>
            <h1>Product Inventory</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} - {product.stock} in stock
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
