// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Change this according to your storage method
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="container">
       <h2>Dashboard</h2>
     <header className="header"> 
        <nav className="navigation">
          <Link to="/products" style={{ marginRight: '15px' }}>Product Management</Link>
          <Link to="/users" style={{ marginRight: '15px' }}>User Management</Link>
          <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
        </nav>
      </header>

      <section style={{ marginTop: '20px' }}>
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div>
            <ProductBarChart products={products} /> {/* Render the ProductBarChart */}
            <table style={{ width: '50%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Name</th>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Description</th>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Price</th>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>{product.name}</td>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>{product.description}</td>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>${formatPrice(product.price)}</td>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;