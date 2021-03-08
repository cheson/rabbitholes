import React from "react";
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {

  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to="/">Flow</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>
                <Nav.Link><Link to="/view">View</Link></Nav.Link>
                <Nav.Link><Link to="/count">Count</Link></Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item><Link to="/about">About</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/list">List</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#separated">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default NavigationBar;
