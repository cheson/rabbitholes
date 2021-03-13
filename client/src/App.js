import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from "./components/List";
import Login from "./components/Login";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Count from "./components/Count";
import About from "./components/About";
import LogoutButton from "./components/LogoutButton";
import CreateFlow from "./components/CreateFlow";
import ViewFlow from "./components/ViewFlow";
import ViewFlows from "./components/ViewFlows";
import Profile from "./components/Profile";

import { initializeFirebase, initializeAuthObserver } from "./utils/firebase";

import { APIService } from "./utils/api";
import * as routes from "./constants/routes";

export default function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const firebase = initializeFirebase();
  const apiService = new APIService(firebase);

  useEffect(() => {
    const unregisterAuthObserver = initializeAuthObserver(firebase, (user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setAuthUser(user);
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      <NavigationBar
        authUser={authUser}
        logoutButton={<LogoutButton firebase={firebase} />}
      />

      <Switch>
        <Route exact path={[routes.ROOT, routes.HOME]}>
          <Home />
        </Route>
        <Route path={routes.LOGIN}>
          <Login
            authUser={authUser}
            setAuthUser={setAuthUser}
            firebase={firebase}
            apiService={apiService}
          />
        </Route>
        <Route path={routes.CREATE_FLOW}>
          <CreateFlow />
        </Route>
        <Route path={routes.VIEW_FLOWS}>
          <ViewFlows />
        </Route>
        <Route path={routes.VIEW_FLOW}>
          <ViewFlow />
        </Route>
        <Route path={routes.PROFILE}>
          <Profile />
        </Route>

        {/* example routes and components */}
        <Route path={routes.ABOUT}>
          <About authUser={authUser} />
        </Route>
        <Route path="/list">
          <List apiService={apiService} />
        </Route>
        <Route path="/count">
          <Count />
        </Route>
      </Switch>
    </Router>
  );
}
