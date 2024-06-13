import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const News = ({ shops }) => {

  const navigate = useNavigate();

  const redirectToViewShop = (id) => {
    navigate(`/shop/${id}/show`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Last shops</h2>
      <div className="d-flex overflow-auto">
        {shops.map((shop) => (
          <div key={shop.id} className="me-3">
            <Card style={{ width: "400px" }} className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="fw-bold">{shop.name}</Card.Title>
                <Card.Text>{shop.community}</Card.Text>
                <Button variant="success" onClick={() => redirectToViewShop(shop.id)}>View more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
