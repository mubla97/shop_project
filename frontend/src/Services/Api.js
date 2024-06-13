import axios from 'axios';

// Función para obtener los roles del usuario
export const getUserRoles = async () => {
  try {
    const response = await axios.get("http://localhost:8080/user/roles", { withCredentials: true });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los roles del usuario:', error);
    return [];
  }
};
