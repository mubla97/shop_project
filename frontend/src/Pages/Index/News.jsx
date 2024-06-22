import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const News = ({ news }) => {
  const navigate = useNavigate();

  const redirectToViewShop = (id) => {
    navigate(`/shop/${id}/show`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Last shops</h2>
      <div
        className="d-flex overflow-auto"
        style={{ height: '420px', overflowY: 'hidden', paddingBottom: '4px' }}
      >
        {news.map((n) => (
          <div key={n.id} className="me-3" style={{ marginBottom: '4px' }}>
            <Card
              sx={{
                width: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid #000',
                borderRadius: '10px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
              }}
              className="shadow-sm"
            >
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'cover' }}
                image={n.image ? `http://localhost:8080/images/shop_images/${n.image}` : 'http://localhost:8080/defaults/shop.jpg'}
                title="Shop Image"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" className="fw-bold">
                  {n.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {n.community}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="success" size="small" onClick={() => redirectToViewShop(n.id)}>View more</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
