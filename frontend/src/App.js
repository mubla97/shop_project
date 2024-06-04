import './App.css';
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';

import Index from './Pages/Index';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {

  useEffect(() => {
    // Configurar Axios para enviar cookies
    axios.defaults.withCredentials = true;

    // Obtener y configurar el token CSRF al cargar la aplicación
    axios.get('http://localhost:8080/csrf-token')
      .then(response => {
        // Configurar el token CSRF en Axios
        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
      })
      .catch(error => {
        console.error('Error al obtener el token CSRF:', error);
      });
  }, []);

  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
  );
}

export default App;