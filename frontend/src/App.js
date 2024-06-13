import './App.css';
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';

import Index from './Pages/Index/Index';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Shop from './Pages/Shop/Shop';
import EditShop from './Pages/Shop/EditShop';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import Settings from './Pages/Profile/Settings';
import ChangePassword from './Pages/Profile/Password';
import Avatar from './Pages/Profile/Avatar';
import ProductsShop from './Pages/Shop/Products';
import CreateProduct from './Pages/Shop/CreateProduct';
import EditProduct from './Pages/Shop/EditProduct';
import ShopDetail from './Pages/Index/ShopDetail';

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
        <Route path="/shop/:shopId" element={<EditShop />} />
        <Route path="/shop/:shopId/products" element={<ProductsShop />} />
        <Route path="/shop/:shopId/products/create" element={<CreateProduct />} />
        <Route path="/shop/:shopId/products/:productId/edit" element={<EditProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/profile/password" element={<ChangePassword />} />
        <Route path="/profile/avatar" element={<Avatar />} />
        <Route path="/shop/:shopId/show" element={<ShopDetail />} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;