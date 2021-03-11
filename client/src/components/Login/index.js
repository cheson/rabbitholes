import React from "react";
import firebase from "firebase";
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
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect
        // automatically or whether we leave that to developer to handle.
        console.log("auth result");
        console.log(authResult);

        props.firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            console.log(idToken);
            if (isNewUser) {
                fetch("/1/users/register", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: idToken }),
                    }).then((res) => console.log(res.status));
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(redirectUrl);
        
        //props.setAuthUser(props.firebase.auth().currentUser);
        return true;
      },
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  console.log(props.authUser);
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
      <p>
        Welcome {props.authUser.displayName}! You are now
        signed-in!
      </p>
      <a onClick={() => { console.log("signing out"); props.firebase.auth().signOut(); props.setAuthUser(null); } }>Sign-out</a>
    </div>
  );
}

Login.propTypes = {
  authUser: PropTypes.object,
  setAuthUser: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default Login;
