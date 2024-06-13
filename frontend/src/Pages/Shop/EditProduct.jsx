import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

const EditProduct = () => {
  const { shopId, productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/shop/${shopId}/products/${productId}`);
        const product = response.data;
        
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(parseInt(product.quantity, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [shopId, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.put(`http://localhost:8080/shop/${shopId}/products/${productId}`, {
        name,
        description,
        price,
        quantity,
        shop_id: shopId
      }, {
        withCredentials: true
      });

      navigate(`/shop/${shopId}/products`);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product. Please try again.');
    }

    setLoading(false);
  };

  if (loading) {
    return (
        <div className="mt-4">
            <div className="text-center">
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginTop: '30px' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Shop ID:</label>
          <input type="number" value={shopId} required disabled style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" disabled={loading} className="btn btn-success btn-lg mt-3">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
