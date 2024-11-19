import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/items/');
            setItems(response.data);
        } catch (err) {
            setError('Error fetching items');
        }
    };

    const addItem = async () => {
        if (!name || !quantity) {
            setError('Name and quantity are required');
            return;
        }

        const newItem = { name, quantity: parseInt(quantity), description };

        try {
            await axios.post('http://127.0.0.1:8000/api/items/', newItem);
            fetchItems();
            setName('');
            setQuantity('');
            setDescription('');
            setError(null);
        } catch (err) {
            setError('Error adding item');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`);
            fetchItems();
        } catch (err) {
            setError('Error deleting item');
        }
    };

    return (
        <div>
            <h1>Inventory Management</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} - {item.description}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;