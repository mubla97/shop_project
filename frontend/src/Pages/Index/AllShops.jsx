import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10; // Número de tiendas por página

const AllShops = ({ shops }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(shops.length / PAGE_SIZE);

  // Función para redirigir a la página de una tienda específica
  const redirectToViewShop = (id) => {
    navigate(`/shop/${id}/show`);
  };

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcular el índice inicial y final para las tiendas de la página actual
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  // Obtener las tiendas de la página actual
  const currentShops = shops.slice(startIndex, endIndex);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All shops</h2>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {currentShops.map((shop) => (
          <div key={shop.id} className="col">
            <Card className="h-100 shadow-sm mb-3">
              <Card.Body>
                <Card.Title className="fw-bold">{shop.name}</Card.Title>
                <Card.Text>{shop.community}</Card.Text>
                <Button variant="success" onClick={() => redirectToViewShop(shop.id)}>View more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Mostrar la paginación si hay más de una página */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AllShops;
