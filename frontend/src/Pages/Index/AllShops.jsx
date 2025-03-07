import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Pagination } from '@mui/material';

const PAGE_SIZE = 8;

const AllShops = ({ shops }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(shops.length / PAGE_SIZE);

  const redirectToViewShop = (id) => {
    navigate(`/shop/${id}/show`);
  };

  // Calcular el índice inicial y final para las tiendas de la página actual
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  // Obtener las tiendas de la página actual
  const currentShops = shops.slice(startIndex, endIndex);

  return (
    <Container className="mt-4">
      <Typography variant="h4" className="mb-4" style={{ color: 'white' }}>All Shops</Typography>
      <Grid container spacing={4}>
        {currentShops.map((shop) => (
          <Grid item key={shop.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '3px solid #fff',
                borderRadius: '10px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
                backgroundColor: 'black',
                color:'white',
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'cover' }}
                image={shop.image ? `http://localhost:8080/images/shop_images/${shop.image}` : 'http://localhost:8080/defaults/shop.jpg'}
                title="Shop Image"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" className="fw-bold" style={{color:"white"}}>
                  {shop.name}
                </Typography>
                <Typography variant="body2" style={{color:"white"}}>
                  {shop.community}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => redirectToViewShop(shop.id)}
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
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Pagination
          className="mt-4 pb-4"
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
          sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
        />
      )}
    </Container>
  );
};

export default AllShops;
