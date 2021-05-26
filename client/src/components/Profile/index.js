import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import ResourceNotFound from "../ResourceNotFound";
import ImageDropzone from "../ImageDropzone";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// for all changes, need to update my backend first before firebase, THEN return success to user
// https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

function updateUser(user, email, name, photo) {
  console.log("updating", user, email, name, photo);
  //   user.updateProfile({
  //   displayName: name,
  //   email: email,
  //   photoURL: "https://example.com/jane-q-user/profile.jpg"
  // }).then(function() {
  //   console.log("success");
  //   // Update successful, should update local state of authUser
  // }).catch(function(error) {
  //   console.log(error);
  //   // An error happened.
  // });
}

function deleteUser(user, apiService, history) {
  confirmAlert({
    message: "Are you sure you want to delete your account?",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          console.log("deleting", user);
          // delete user from backend, delete all their flows too
          // delete user from firebase
          // if successful, logout and return to home screen
          apiService
            .deleteUser(user.uid)
            .then(user.delete()) // maybe this should go first because it has the chance to fail if user hasn't logged in recently
            .then(() => {
              console.log(
                "delete complete, clear auth user and return to home screen. also need to handle relogin if sensitive"
              );
              history.push("/home");
            });
        },
      },
      {
        label: "No",
      },
    ],
  });
}

function Profile(props) {
  return props.authUser ? (
    <div>
      <div className={styles.header}>
        <h3> Profile </h3>
        <hr />
      </div>

      <div className={styles.profileBody}>
        <ImageDropzone initialImageUrl={props.authUser.photoURL} />

        <div className={styles.formEntry}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            defaultValue={props.authUser.email}
            className={styles.emailText}
          ></input>
        </div>

        <div className={styles.formEntry}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            defaultValue={props.authUser.displayName}
            className={styles.nameText}
          ></input>
        </div>

        <div className={styles.formEntry}>
          <Button variant="primary" onClick={() => updateUser()}>
            Save changes
          </Button>
        </div>
        <div className={styles.formEntry}>
          <Button
            variant="danger"
            onClick={() =>
              deleteUser(props.authUser, props.apiService, props.history)
            }
          >
            Delete account
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <ResourceNotFound message={`No user logged in.`} />
  );
}

Profile.propTypes = {
  authUser: PropTypes.object,
  apiService: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Profile);
