import { useEffect, useState } from 'react';

import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCekVCfjfPPB21WgR-9wL8k78KpmgOzS3s",
    authDomain: "flow-website-2f43f.firebaseapp.com",
    projectId: "flow-website-2f43f",
    storageBucket: "flow-website-2f43f.appspot.com",
    messagingSenderId: "227156325482",
    appId: "1:227156325482:web:9e7730c2400062059ec613",
    measurementId: "G-Y6B1Q541FC",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: "/home",
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            var user = authResult.user;

            var isNewUser = authResult.additionalUserInfo.isNewUser;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect
            // automatically or whether we leave that to developer to handle.
            console.log(user.displayName)
            console.log(user.email)
            console.log(user.uid)
            console.log(isNewUser)

            fetch('/1/users/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: user.displayName, email: user.email, id: user.uid})
                })
                .then((res) => res.json())
                .then((list) => console.log(list));
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
  
  function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
  
    if (!isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
  
  export default Login;