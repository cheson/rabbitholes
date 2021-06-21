import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { LOGIN } from "../../constants/routes";

function LogoutButton(props) {
  return (
    <Button
      variant="outline-primary"
      onClick={() => {
        props.firebase.auth().signOut();
        props.history.push(LOGIN);
      }}
    >
      Logout
    </Button>
  );
}

export default withRouter(LogoutButton);

LogoutButton.propTypes = {
  history: PropTypes.object,
  firebase: PropTypes.object,
};
