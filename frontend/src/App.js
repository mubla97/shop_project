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
import Search from './Pages/Search';
import Users from './Pages/Admin/User/Users';
import AddUser from './Pages/Admin/User/AddUser';
import EditUser from './Pages/Admin/User/EditUser';
import Shops from './Pages/Admin/Shop/Shops';
import AddShop from './Pages/Admin/Shop/AddShop';
import EditShopAdmin from './Pages/Admin/Shop/EditShop';
import ProductsAdmin from './Pages/Admin/Product/Products';
import AddProduct from './Pages/Admin/Product/AddProduct';
import EditProductAdmin from './Pages/Admin/Product/EditProduct';

import Unauthorized from './Pages/Admin/Unauthorized';
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
      <Route path="/search" element={<Search />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<AddUser />} />
        <Route path="/users/:userId/edit" element={<EditUser />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shops/create" element={<AddShop />} />
        <Route path="/shops/:shopId/edit" element={<EditShopAdmin />} />
        <Route path="/products" element={<ProductsAdmin />} />
        <Route path="/products/create" element={<AddProduct />} />
        <Route path="/products/:productId/edit" element={<EditProductAdmin />} />
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