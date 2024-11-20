import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Axios default configuration (optional if headers or tokens are needed globally)
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization headers if necessary
    // 'Authorization': `Bearer ${yourToken}`
  },
});

// Create a product
export const createProduct = async (productData) => {
  try {
    console.log("Request URL:", `${API_URL}/api/products/create/`); // Debugging
    const response = await axiosInstance.post('/api/products/create/', productData);
    console.log("Create Product Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error; // Re-throw error for further handling
  }
};

// Get all products
export const getProducts = async () => {
  try {
    console.log("Request URL:", `${API_URL}/api/products/`); // Debugging
    const response = await axiosInstance.get('/api/products/');
    console.log("Get Products Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error; // Re-throw error for further handling
  }
};

// Add stock to a product
export const addStock = async (data) => {
  try {
    console.log("Request URL:", `${API_URL}/api/products/add-stock/`); // Debugging
    const response = await axiosInstance.put('/api/products/add-stock/', data);
    console.log("Add Stock Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error.response?.data || error.message);
    throw error; // Re-throw error for further handling
  }
};

// Remove stock from a product
export const removeStock = async (data) => {
  try {
    console.log("Request URL:", `${API_URL}/api/products/remove-stock/`); // Debugging
    const response = await axiosInstance.put('/api/products/remove-stock/', data);
    console.log("Remove Stock Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing stock:", error.response?.data || error.message);
    throw error; // Re-throw error for further handling
  }
};
