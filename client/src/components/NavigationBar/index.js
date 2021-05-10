import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as routes from "../../constants/routes";
import styles from "./NavigationBar.module.css";
import rabbitIcon from "../../assets/rabbit.png";

function NavigationBar(props) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">
            <img src={rabbitIcon} className={styles.icon}></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Menu" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to={routes.ABOUT}>
                About
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={routes.CREATE_FLOW}>
                Create Flow
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={routes.VIEW_FLOW}>
                View Flow
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={routes.VIEW_FLOWS}>
                View Flows
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={routes.PROFILE}>
                Profile
              </NavDropdown.Item>

              {props.authUser ? (
                props.logoutButton
              ) : (
                <NavDropdown.Item as={Link} to={routes.LOGIN}>
                  Login
                </NavDropdown.Item>
              )}

              {/* <NavDropdown.Item as={Link} to="/count">
                Count
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/list">
                List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#separated">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
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
