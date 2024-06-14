import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { UserContext } from '../../../Context/UserContext';

const AddProduct = () => {
  const { role, loading } = useContext(UserContext);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shop_id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (role !== 'admin') {
        navigate(`/unauthorized`);
        return;
    }

    const fetchShops = async () => {
      try {
        const shopsResponse = await axios.get(
          `http://localhost:8080/shops`,
          { withCredentials: true }
        );

        if (Array.isArray(shopsResponse.data)) {
          setShops(shopsResponse.data);
        } else {
          setShops([]);
        }

        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoadingData(false);
      }
    };

    fetchShops();
  }, [loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shop_id, ...productData } = formData;

    try {
      await axios.post(
        `http://localhost:8080/shops/${shop_id}/products`,
        productData,
        { withCredentials: true }
      );
      navigate(`/products`);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Consolidar el estado de carga
  if (loading || loadingData) {
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
    <div
      className="mb-4"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginTop: "30px",
      }}
    >
      <h2>Add Product</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter product name..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
            placeholder="Enter product description..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            placeholder="Enter product price..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="0"
            required
            placeholder="Enter product quantity..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Shop</Form.Label>
          <Form.Control
            as="select"
            name="shop_id"
            value={formData.shop_id}
            onChange={handleInputChange}
            required
            placeholder="Select shop..."
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" disabled={loading} className="btn btn-success btn-lg mt-3">
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
