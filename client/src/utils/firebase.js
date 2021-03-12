import firebase from "firebase";

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

export function initializeFirebase() {
  if (firebase.apps.length > 0) {
    return firebase.app();
  }
  return firebase.initializeApp(firebaseConfig);
}

export function initializeAuthObserver(firebase, onAuthStateChangedHandler) {
  // onAuthStateChanged returns an unregister observer function
  const unregisterAuthObserver = firebase
    .auth()
    .onAuthStateChanged(onAuthStateChangedHandler);
  return unregisterAuthObserver;
}
