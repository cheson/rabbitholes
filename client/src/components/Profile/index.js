import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import ResourceNotFound from "../ResourceNotFound";
import ImageDropzone from "../ImageDropzone";
import { Button } from "react-bootstrap";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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

function deleteUser(user) {
  confirmAlert({
    message: "Are you sure you want to delete your account?",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          // user.delete().then(function() {
          //   // User deleted.
          // }).catch(function(error) {
          //   // An error happened.ß
          // });
          console.log("deleting", user);
        },
      },
      {
        label: "No",
      },
    ],
  });
}

export default function Profile(props) {
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
          <Button variant="primary" onClick={() => updateUser()}>Save changes</Button>
        </div>
        <div className={styles.formEntry}>
          <Button variant="danger" onClick={() => deleteUser(props.authUser)}>
            Delete user
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
};
