import React, { useState } from "react";
// import React from "react"
import logo from "./logo.svg";
import "./App.css";
import { type } from "os";
import Greetings from "./Main/main";
import {
  Button,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core/";
import Header from "./header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import LoginForm from "./router/login"
import LoginForm from "./components/Login";
import SignUp from "./components/SignUp";
import Vs from "./Menu/VS/vs";
function App() {
  //const a = useState
  const [a, setA] = useState(1);

  let callback = {
    setState: (count: number) => {
      setA(count + 1);
    },
  };

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={Greetings}
            name="hello world"
            mark="!!!!!"
          />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUp} />
          <Route path="/vs" component={Vs} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
