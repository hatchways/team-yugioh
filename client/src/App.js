import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";

import LandingPage from "./pages/Landing";
import Home from "./pages/Home"
import LogInPage from "./pages/Login";
import SignUpPage from "./pages/Signup";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/signup"/>
        </Route>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" componzent={LogInPage} />
        <Route path="/home" componzent={Home} />

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
