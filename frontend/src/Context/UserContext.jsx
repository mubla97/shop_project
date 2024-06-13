import { createContext, useState, useEffect } from 'react';
import { getUserRoles } from '../Services/Api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      const roles = await getUserRoles();
      if (roles.includes('admin')) {
        setRole('admin');
      } else if (roles.includes('user')) {
        setRole('user');
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    fetchRoles();
  }, []);

  const updateUserRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <UserContext.Provider value={{ role, loading, updateUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
