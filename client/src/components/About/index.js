import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function About(props) {
  return (
    <div>
      <h2>About</h2>
      <div>{props.authUser ? props.authUser.displayName : "whatever name"}</div>
      <Alert dismissible variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Change this and that and try again.</p>
      </Alert>
      <a href="/list">LINK TO LIST</a>
      <Link to="/list">LINK TO LIST SMOOTH</Link>
    </div>
  );
}

About.propTypes = {
  authUser: PropTypes.object,
  firebase: PropTypes.object.isRequired,
};
