import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import NavIndex from "./Navs/NavIndex";
import NavUser from "./Navs/NavUser";
import NavAdmin from "./Navs/NavAdmin";

const Nav = () => {
  const { role, loading } = useContext(UserContext);

  if (loading) {
    return (
          <div className="mt-4">
              <div className="text-center">
                  <strong>Loading...</strong>
              </div>
          </div>
        );
  }

  if (role === 'admin') {
    return <NavAdmin />;
  } else if (role === 'user') {
    return <NavUser />;
  } else {
    return <NavIndex />;
  }
};

export default Nav;
