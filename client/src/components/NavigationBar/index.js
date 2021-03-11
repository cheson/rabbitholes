import React from "react";
import { Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


function NavigationBar(props) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">Flow</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/count">
              Count
            </Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/about">
                About
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/list">
                List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#separated">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {props.authUser ? 
            <Button variant="outline-primary" onClick={()=>{props.firebase.auth().signOut()}}>Logout</Button> : 
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

NavigationBar.propTypes = {
    authUser: PropTypes.object,
    firebase: PropTypes.object.isRequired
};

export default NavigationBar;
