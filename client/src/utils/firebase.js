import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDgOZrGaRgHIOJdKoCTBYigDknVIQ-Tnak",
  authDomain: "rabbitholes-c3d07.firebaseapp.com",
  projectId: "rabbitholes-c3d07",
  storageBucket: "rabbitholes-c3d07.appspot.com",
  messagingSenderId: "1096051919781",
  appId: "1:1096051919781:web:0e913570cdafe5e53c364c",
  measurementId: "G-KXDLYB219F"
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
