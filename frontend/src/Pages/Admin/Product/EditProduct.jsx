import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";

const EditProduct = () => {
  const { role, loading } = useContext(UserContext);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [shopId, setShopId] = useState(""); // State para almacenar shopId
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (role !== "admin") {
      navigate(`/unauthorized`);
      return;
    }

    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8080/products/${productId}`,
          { withCredentials: true }
        );

        const { name, description, price, quantity, shop_id } = productResponse.data;
        setFormData({ name, description, price, quantity });
        setShopId(shop_id); // Almacenar shopId en el estado
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data. Please try again.");
        setLoadingData(false);
      }
    };

    fetchProduct();
  }, [loading, productId, navigate, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Añadir shopId al formData
    const formDataWithShopId = {
      ...formData,
      shop_id: shopId
    };

    try {
      await axios.put(
        `http://localhost:8080/shops/${shopId}/products/${productId}`,
        formDataWithShopId,
        { withCredentials: true }
      );
      navigate(`/products`);
    } catch (err) {
      console.error("Error updating product:", err);
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
      <h2>Edit Product</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
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
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default EditProduct;
