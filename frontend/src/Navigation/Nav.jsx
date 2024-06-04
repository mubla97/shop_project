import NavIndex from "./Navs/NavIndex";
import React from 'react';

import NavUser from "./Navs/NavUser";

const Nav = () => {

  let token = localStorage.getItem("accessToken");

 if (token !== null) {
    return <NavUser />
  } else {
    return <NavIndex />
  }

};

export default Nav;