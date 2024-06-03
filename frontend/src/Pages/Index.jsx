import { useState, useEffect } from "react";

const Index = () => {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const tokenAccess = localStorage.getItem("accessToken");

    console.log("Token: " + tokenAccess);
    
    if (tokenAccess !== null) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, [userLogged]); // Añade userLogged al array de dependencias

  if (userLogged) {
    return <h1>Usuario logueado con éxito!</h1>;
  } else {
    return <h1>Usuario no logueado</h1>;
  }
};

export default Index;
