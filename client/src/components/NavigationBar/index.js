import React, { useState } from "react";
import { Button, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as routes from "../../constants/routes";
import styles from "./NavigationBar.module.css";
import rabbitIcon from "../../assets/rabbit.png";
import { Search } from "react-bootstrap-icons";

function NavigationBar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  function searchFlows() {
    const urlSearchParams = searchQuery ? "?search=" + searchQuery : "";
    props.history.push("/viewFlows" + urlSearchParams);
  }

  return (
    <div id="navbarId">
      <Navbar
        // fixed="top"
        collapseOnSelect
        expand={false}
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>
          {/* TODO: investigate bug - need to close navbar after select if moving to different pages */}
          <Link to={routes.ROOT}>
            <img src={rabbitIcon} className={styles.icon}></img>
          </Link>
        </Navbar.Brand>
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            searchFlows();
          }}
          inline
        >
          <FormControl
            type="text"
            placeholder=""
            className="mr-sm-2"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="link">
            <Search onClick={searchFlows} />
          </Button>
        </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="createFlow" as={Link} to={routes.CREATE_FLOW}>
              Create Flow
            </Nav.Link>
            <Nav.Link eventKey="viewFlows" as={Link} to={routes.VIEW_FLOWS}>
              View Flows
            </Nav.Link>
            {props.authUser && (
              <Nav.Link eventKey="profile" as={Link} to={routes.PROFILE}>
                Profile
              </Nav.Link>
            )}
            {props.authUser && (
              <Nav.Link eventKey="myFlows" as={Link} to={routes.MY_FLOWS}>
                My Flows
              </Nav.Link>
            )}
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
  history: PropTypes.object,
};

export default withRouter(NavigationBar);
