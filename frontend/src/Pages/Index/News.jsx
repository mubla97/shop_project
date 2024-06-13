import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const News = ({ news }) => {

  const navigate = useNavigate();

  const redirectToViewShop = (id) => {
    navigate(`/shop/${id}/show`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Last shops</h2>
      <div className="d-flex overflow-auto">
        {news.map((n) => (
          <div key={n.id} className="me-3">
            <Card style={{ width: "400px" }} className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="fw-bold">{n.name}</Card.Title>
                <Card.Text>{n.community}</Card.Text>
                <Button variant="success" onClick={() => redirectToViewShop(n.id)}>View more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
