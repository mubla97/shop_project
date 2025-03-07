import React, { useState, useEffect } from "react";
import { BsDoorOpen } from 'react-icons/bs';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';

const NavUser = () => {

    const doLogout = () => {
        localStorage.clear();
        window.location = '/';
    };

    return (
        <Navbar collapseOnSelect expand="sm" variant="dark" style={{ backgroundColor: 'black' }}>
            <div className="container-fluid ml-5">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="Navbar">
                    <Nav>
                        <Nav.Link href="/" style={{ fontWeight: 'bold', color: 'white' }}>
                            Shoppex
                        </Nav.Link>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        <Nav.Link href="/shop">Shop</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="navbar-nav ms-auto pe-md-5 navbar-nav">
                    <Navbar.Collapse id="ProfileCollapse">
                        <Nav>
                            <NavDropdown title="Profile" id="basic-nav-dropdown" className="pe-md-5">
                                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={doLogout}><BsDoorOpen />Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </div>
        </Navbar>
    );
};

export default NavUser;
