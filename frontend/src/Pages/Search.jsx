import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination'; // Importamos el componente de paginación de Material UI
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const Search = () => {
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchType, setSearchType] = useState('shops');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(12) // Resultados por página (ajustable)
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

  // Paginación: Calcular los elementos a mostrar en la página actual
  const paginate = (array) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  // Cambiar página cuando el usuario interactúa con el control de paginación
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <MDBContainer fluid className='background-radial-gradient overflow-hidden container-full-height'>
      <MDBRow>
        <div className="mt-4">
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Form>
                <Form.Group controlId="searchType" className="mb-3" style={{ position: 'relative', zIndex: 10 }}>
                  <Typography variant="h4" className="m-4" style={{ color: 'white' }}>Select Type</Typography>
                  <Form.Control
                    as="select"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="shops">Shops</option>
                    <option value="products">Products</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="search" style={{ position: 'relative', zIndex: 10 }}>
                  <Form.Control
                    type="text"
                    placeholder={`Search for ${searchType}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                  />
                </Form.Group>
              </Form>

              <MDBCol className='position-relative'>
                {searchType === 'shops' && (
                  <>
                    <Typography variant="h4" className="m-4" style={{ color: 'white' }}>Shops</Typography>
                    <div className="d-flex flex-wrap justify-content-center">
                      <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                      <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong"></div>
                      {paginate(filteredShops).map((shop) => (
                        <Card key={shop.id} style={{ width: "400px" }} className="shadow-sm m-3">
                          <Card.Body>
                            <Card.Title className="fw-bold">{shop.name}</Card.Title>
                            <Card.Text>{shop.community}</Card.Text>
                            <Button
                              className="w-100 mb-4 d-flex justify-content-center align-items-center"
                              style={{
                                height: '50px',
                                padding: '0.5rem',
                                position: 'relative',
                                backgroundColor: '#fff', // blanco personalizado
                                borderColor: '#fff', // Asegura que el borde sea del mismo color
                                color: '#000', // Color del texto negro
                                borderRadius: '0.25rem', // Opcional: bordes redondeados
                                fontWeight: 'bold'
                              }}
                              onClick={() => redirectToViewShop(shop.id)}
                            >
                              <div className="w-100 d-flex justify-content-center align-items-center">View more</div>
                            </Button>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                {searchType === 'products' && (
                  <>
                    <Typography variant="h4" className="m-4" style={{ color: 'white' }}>Products</Typography>
                    <div className="d-flex flex-wrap justify-content-center">
                      {paginate(filteredProducts).map((product) => (
                        <Card key={product.id} style={{ width: "400px", margin: "10px" }} className="shadow-sm">
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                          </Card.Body>
                          <div className="card-footer d-flex justify-content-center">
                            <Button variant="primary" onClick={() => redirectToViewShop(product.shop_id)}>View shop</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                {/* Paginación */}
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    count={Math.ceil(filteredShops.length / itemsPerPage)} // Calcula la cantidad total de páginas
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              </MDBCol>
            </>
          )}
        </div>
      </MDBRow>
    </MDBContainer>
  );
};

export default Search;
