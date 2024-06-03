import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

const NavIndex = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/">
              Shoppex
            </Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <Navbar.Collapse id="responsive-navbar-Logg">
            <Nav>
              <Nav.Link href="/signup" >Sign up</Nav.Link>
              <Nav.Link href="/login">Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>

      </div>
    </Navbar>
  );
};
export default NavIndex;
