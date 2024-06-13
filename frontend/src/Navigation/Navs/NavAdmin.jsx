import React from "react";
import { BsDoorOpen } from 'react-icons/bs';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavAdmin = () => {

    const doLogout = () => {
        localStorage.clear();
        window.location = '/';
    }

    return (
        <Navbar collapseOnSelect expand="sm" variant="dark" style={{ backgroundColor: 'green' }}>
            <div className="container-fluid">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"> {/* Ajustamos a me-auto para centrar los elementos */}
                        <Nav.Link href="/" style={{ fontWeight: 'bold', color: 'white' }}>
                            Shoppex
                        </Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        <Nav.Link href="/shop">Shop</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto pe-4"> {/* Añadimos padding-right (pe-4) para mover a la izquierda */}
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/shops">Shops</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                        {/* Profile Dropdown */}
                        <NavDropdown title="Profile" id="basic-nav-dropdown" align="end"> {/* align="end" para alinear dropdown a la izquierda */}
                            <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
                            <NavDropdown.Item href="/profile/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={doLogout}>
                                <BsDoorOpen /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavAdmin;
