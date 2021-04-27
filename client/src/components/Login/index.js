import React from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  if (!props.authUser) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={props.firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {props.authUser.displayName}! You are now signed-in!</p>
      <a
        onClick={() => {
          console.log("signing out");
          props.firebase.auth().signOut();
        }}
      >
        Sign-out
      </a>
    </div>
  );
}

Login.propTypes = {
  apiService: PropTypes.object,
  authUser: PropTypes.object,
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withRouter(Login);
