import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as routes from "../../constants/routes";
import styles from "./NavigationBar.module.css";
import rabbitIcon from "../../assets/rabbit.png";

function NavigationBar(props) {
  return (
    <div>
      <Navbar collapseOnSelect expand={false} bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">
            <img src={rabbitIcon} className={styles.icon}></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="About" as={Link} to={routes.ABOUT}>
              About
            </Nav.Link>
            <Nav.Link eventKey="createFlow" as={Link} to={routes.CREATE_FLOW}>
              Create Flow
            </Nav.Link>
            <Nav.Link eventKey="viewFlows" as={Link} to={routes.VIEW_FLOWS}>
              View Flows
            </Nav.Link>
            <Nav.Link eventKey="profile" as={Link} to={routes.PROFILE}>
              Profile
            </Nav.Link>
            <Nav.Link eventKey="login" as={Link} to={routes.LOGIN}>
              {props.authUser ? (
                props.logoutButton
              ) : (
                <Button variant="outline-primary">Login</Button>
              )}
            </Nav.Link>
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
