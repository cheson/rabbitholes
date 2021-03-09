import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from "./components/List";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import Alert from "react-bootstrap/Alert";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <NavigationBar />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/view">
            <View />
          </Route>
          <Route path="/count">
            <Count />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <Alert dismissible variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Change this and that and try again.</p>
      </Alert>
      <a href="/list">LINK TO LIST</a>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function View() {
  return (
    <div>
      <h2>View</h2>
    </div>
  );
}

function Count() {
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    // testing fetch API, works great!
    let url = "https://baconipsum.com/api/?type=meat-and-filler";
    fetch(url).then(function (response) {
      response.text().then(function (text) {
        setQuote(text);
      });
    });
  }, []); //empty dependencies array means no need to re-evaluate effect after render unless something in array changed.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>{quote}</p>
    </div>
  );
}
