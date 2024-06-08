import './App.css';
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';

import Index from './Pages/Index';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Shop from './Pages/Shop';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import Settings from './Pages/Profile/Settings';

import ProtectedRoute from './Components/ProtectedRoute';

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
      <Route element={<ProtectedRoute />}>
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/settings" element={<Settings />} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;