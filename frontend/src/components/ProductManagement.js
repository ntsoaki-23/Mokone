// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductManagement = ({ setProducts }) => { // Receive setProducts from App
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setLocalProducts(response.data);
      setProducts(response.data); // Update shared products state
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, newProduct);
        setEditingProduct(null);
      } else {
        await axios.post('http://localhost:5000/api/products', newProduct);
      }
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <header className="header">
        <nav className="navigation">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            
            <li><Link to="/users">User Management</Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>Product List</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
