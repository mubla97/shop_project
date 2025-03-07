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
    <div className="container">
       <Typography variant="h4" className="mb-4 pt-4" style={{ color: 'white' }}>Last Shops</Typography>
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
                border: '3px solid #fff',
                borderRadius: '10px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
                backgroundColor: 'black',
                color:'white',
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
                <Typography gutterBottom variant="h5" component="div" className="fw-bold" style={{color:"white"}}>
                  {n.name}
                </Typography>
                <Typography variant="body2" style={{color:"white"}}>
                  {n.community}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => redirectToViewShop(n.id)}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#aaaaaa',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  View More
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
