import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from "./components/List";
import Login from "./components/Login";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Count from "./components/Count";
import About from "./components/About";

import { initializeFirebase } from "./utils/firebase.js";

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const firebase = initializeFirebase();

  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setAuthUser(user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      <NavigationBar authUser={authUser} firebase={firebase}/>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About authUser={authUser}/>
        </Route>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/login">
          <Login
            authUser={authUser}
            setAuthUser={setAuthUser}
            firebase={firebase}
          />
        </Route>
        <Route path="/count">
          <Count />
        </Route>
      </Switch>
    </Router>
  );
}
