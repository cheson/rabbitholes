import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import LogoutButton from "./components/LogoutButton";
import CreateFlowPage from "./components/CreateFlowPage";
import ViewFlow from "./components/ViewFlow";
import ViewFlows from "./components/ViewFlows";
import Profile from "./components/Profile";
import MyFlows from "./components/MyFlows";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import styles from "./App.module.css";

import { initializeFirebase, initializeAuthObserver } from "./utils/firebase";

import { APIService } from "./utils/api";
import * as routes from "./constants/routes";

export default function App() {
  const firebase = initializeFirebase();
  const apiService = new APIService(firebase);

  // Extra variable to prevent app from displaying UI before Firebase loads current user
  const [appReady, setAppReady] = useState(false);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unregisterAuthObserver = initializeAuthObserver(firebase, (user) => {
      setAppReady(true);
      if (user) {
        // Note: if we don't need the entire user object, can pare down:
        // setAuthUser({ displayName: user.displayName, email: user.email, photoURL: user.photoURL });
        setAuthUser(user);
      } else {
        setAuthUser();
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return !appReady ? (
    <div></div>
  ) : (
    <Router>
      <div className={styles.entireBody}>
        <NavigationBar
          authUser={authUser}
          logoutButton={<LogoutButton firebase={firebase} />}
        />

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={[routes.ROOT, routes.HOME]}>
              <Home />
            </Route>
            <Route path={routes.LOGIN}>
              <Login
                authUser={authUser}
                firebase={firebase}
                apiService={apiService}
              />
            </Route>
            <Route path={routes.CREATE_FLOW}>
              <CreateFlowPage apiService={apiService} />
            </Route>
            <Route path={routes.VIEW_FLOWS}>
              <ViewFlows apiService={apiService} />
            </Route>
            <Route path={routes.VIEW_FLOW}>
              <ViewFlow apiService={apiService} />
            </Route>
            <Route path={routes.MY_FLOWS}>
              <MyFlows apiService={apiService} authUser={authUser} />
            </Route>
            <Route path={routes.PROFILE}>
              <Profile apiService={apiService} authUser={authUser} />
            </Route>
            <Route path={routes.PRIVACY_POLICY}>
              <PrivacyPolicy />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
