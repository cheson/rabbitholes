import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as routes from "../../constants/routes";

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
            <Nav.Link as={Link} to={routes.ABOUT}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to={routes.CREATE_FLOW}>
              Create Flow
            </Nav.Link>
            <Nav.Link as={Link} to={routes.VIEW_FLOW}>
              View Flow
            </Nav.Link>
            <Nav.Link as={Link} to={routes.VIEW_FLOWS}>
              View Flows
            </Nav.Link>
            <Nav.Link as={Link} to={routes.PROFILE}>
              Profile
            </Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/count">
                Count
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
            {props.authUser ? (
              props.logoutButton
            ) : (
              <Nav.Link as={Link} to={routes.LOGIN}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

NavigationBar.propTypes = {
  authUser: PropTypes.object,
  logoutButton: PropTypes.object,
};

export default NavigationBar;
