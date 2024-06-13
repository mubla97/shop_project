import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShopDetail = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [loadingShop, setLoadingShop] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/shop/${shopId}/show`, {
          withCredentials: true,
        });
        setShop(response.data);
      } catch (err) {
        console.error("Error fetching shop:", err);
        setError("No se pudo cargar la tienda. Inténtalo de nuevo más tarde.");
      } finally {
        setLoadingShop(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/shop/${shopId}/products/show`, {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchShop();
    fetchProducts();
  }, [shopId]);

  if (loadingShop || loadingProducts) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mb-4">
        <h5 className="card-header" style={{ backgroundColor: 'green', color: 'white' }}>Shop Information</h5>
        <div className="card-body" >
          <h5 className="card-title text-start">{shop.name}</h5>
          <p className="card-text text-start">
            <strong>Phone:</strong> {shop.phone}
          </p>
          <p className="card-text text-start">
            <strong>Address:</strong> {shop.address}
          </p>
          <p className="card-text text-start">
            <strong>Postal Code:</strong> {shop.postal_code}
          </p>
          <p className="card-text text-start">
            <strong>Community:</strong> {shop.community}
          </p>
          <p className="card-text text-start">
            <strong>Shop Type:</strong> {shop.job}
          </p>
        </div>
      </div>

      <h4 className="mb-3">Products</h4>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
        {products.map((product) => (
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
  );
};

export default ShopDetail;
