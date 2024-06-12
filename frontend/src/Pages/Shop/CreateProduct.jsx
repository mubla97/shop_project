import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { shopId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/shop/${shopId}/products`, {
        name,
        description,
        price,
        quantity,
        shop_id: shopId 
      }, {
        withCredentials: true
      });
      console.log(response.data);
      navigate(`/shop/${shopId}/products`);
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
      <h2>Create Product</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Shop ID:</label>
          <input type="number" value={shopId} required disabled style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <button type="submit" disabled={loading} className="btn btn-success btn-lg mt-3">
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
