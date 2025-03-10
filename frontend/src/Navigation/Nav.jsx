import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import NavIndex from "./Navs/NavIndex";
import NavUser from "./Navs/NavUser";
import NavAdmin from "./Navs/NavAdmin";

const Nav = () => {
  const { role, loading } = useContext(UserContext);
  let token = localStorage.getItem("accessToken");

  if (loading) {
    return (
          <div className="p-3" style={{backgroundColor:"black", color:"white"}}>
              <div className="text-center">
                  <strong>Loading...</strong>
              </div>
          </div>
        );
  }

  if (token !== null && role === 'admin') {
    return <NavAdmin />;
  } else if (token !== null && role === 'user') {
    return <NavUser />;
  } else {
    return <NavIndex />;
  }
};

export default Nav;
