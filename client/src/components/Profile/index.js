import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import ResourceNotFound from "../ResourceNotFound";

// function updateUser(authUser, displayName, photoURL, email) {
//   authUser.updateProfile({
//     displayName: "Jane Q. User",
//     photoURL: "https://example.com/jane-q-user/profile.jpg"
//   }).then(function() {
//     console.log("success");
//     // Update successful, should update local state of authUser
//   }).catch(function(error) {
//     console.log(error);
//     // An error happened.
//   });
// }

export default function Profile(props) {
  console.log(props);

  return props.authUser ? (
    <div>
      <div className={styles.header}>
        <h3> Profile </h3>
        <hr />
      </div>
      {JSON.stringify(props.authUser)}
      user profile - [my flows] flow admin+editing should be different in my
      opinion profile picture, username, name, email. delete User change
      password send password reset email
    </div>
  ) : (
    <ResourceNotFound message={`No user logged in.`} />
  );
}

Profile.propTypes = {
  authUser: PropTypes.object,
};

// Update a user's profile - useful for profile picture uploads / changes
// https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
// var user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });
