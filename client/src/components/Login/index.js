import React from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import bunnyEars from "../../assets/bunny_ears.jpeg";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import styles from "./Login.module.css";

function Login(props) {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to URL after sign in is successful.
    signInSuccessUrl: "/about",
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect
        // automatically or whether we leave that to developer to handle.

        if (isNewUser) {
          props.apiService.registerUser();
        }
        props.history.push("/home");
        return false;
      },
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID, //TODO: email verification
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
  if (!props.authUser) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <img src={bunnyEars} className={styles.backgroundImage}></img>
          <div className={styles.loginOptions}>
            <h3>Welcome to rabbitholes!</h3>
            <div>
              Sign in to create flows and keep track of your favorite content.
            </div>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={props.firebase.auth()}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div>{props.history.push("/home")}</div>;
}

Login.propTypes = {
  apiService: PropTypes.object,
  authUser: PropTypes.object,
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(Login);
