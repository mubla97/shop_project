// Search.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const Search = () => {
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all shops and products on component mount
  useEffect(() => {
    // Fetch shops
    axios.get('http://localhost:8080/shop/all')
      .then(response => {
        setShops(response.data);
      })
      .catch(error => console.error('Error fetching shops:', error));

    // Assuming you want to fetch products from a specific shop, otherwise you need a different endpoint
    axios.get('http://localhost:8080/product/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Filter shops and products based on query
  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    setFilteredShops(shops.filter(shop => shop.name.toLowerCase().includes(lowercasedQuery)));
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(lowercasedQuery)));
  }, [query, shops, products]);

  return (
    <div className="container mt-4">
      <Form>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search for shops or products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
      </Form>

      <div className="mt-4">
        <h4>Shops</h4>
        <div className="d-flex flex-wrap">
          {filteredShops.map((shop) => (
            <Card key={shop.id} style={{ width: "400px" }} className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="fw-bold">{shop.name}</Card.Title>
                <Card.Text>{shop.community}</Card.Text>
                <Button variant="success" onClick={() => redirectToViewShop(shop.id)}>View more</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-3">Products</h4>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
            {filteredProducts.map((product) => (
            <div key={product.id} className="col mb-4">
                <Card className="h-100 card-product">
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                </Card>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Assuming redirectToViewShop is a function passed as a prop or available in the component
const redirectToViewShop = (shopId) => {
  // Implement the redirection logic here
  console.log(`Redirecting to shop with ID: ${shopId}`);
};

export default Search;
