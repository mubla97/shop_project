// Search.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Spinner  } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchType, setSearchType] = useState('shops'); 
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  const redirectToViewShop = (id) => {
    navigate(`/shop/${id}/show`);
  };


  // Fetch all shops and products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [shopsResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:8080/shop/all'),
          axios.get('http://localhost:8080/product/all')
        ]);

        setShops(shopsResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter shops and products based on query and searchType
  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    if (searchType === 'shops') {
      setFilteredShops(shops.filter(shop => shop.name.toLowerCase().includes(lowercasedQuery)));
    } else if (searchType === 'products') {
      setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(lowercasedQuery)));
    }
  }, [query, searchType, shops, products]);

  return (
    <div className="container mt-4">
      <Form>
        <Form.Group controlId="searchType" className="mb-3">
          <Form.Label>Search Type</Form.Label>
          <Form.Control
            as="select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="shops">Shops</option>
            <option value="products">Products</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder={`Search for ${searchType}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </Form.Group>
      </Form>

      <div className="mt-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {searchType === 'shops' && (
              <>
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
              </>
            )}

            {searchType === 'products' && (
              <>
                <h4>Products</h4>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
