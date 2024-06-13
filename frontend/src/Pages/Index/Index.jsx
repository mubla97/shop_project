import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import News from "./News"; 

const Index = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        // Realiza la llamada a la API para obtener las tiendas
        const response = await axios.get("http://localhost:8080/shop/news");

        // Supongamos que la API devuelve un array de tiendas en `response.data`
        const latestShops = response.data.slice(0, 10);

        // Actualiza el estado con las tiendas obtenidas
        setShops(latestShops);
      } catch (err) {
        // Maneja cualquier error que ocurra durante la llamada
        console.error("Error fetching shops:", err);
        setError("No se pudieron cargar las tiendas. Inténtalo de nuevo más tarde.");
      } finally {
        // Desactiva el estado de carga
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="container">

      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          Loading shops...
        </div>
      )}
      {!loading && error && (
        <div className="mt-4">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      {!loading && !error && (
        <News shops={shops} />
      )}
    </div>
  );
};

export default Index;
