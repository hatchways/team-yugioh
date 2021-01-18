import React, { useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";

import Home from "./pages/Home";
import LogInPage from "./pages/Login";
import OnBoardingPage from "./pages/OnBoarding/OnBoarding";
import SignUpPage from "./pages/Signup";
import Scheduler from "./pages/Scheduler";
import Authentication from "./pages/Authentication";
import axios from "axios";

import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    try {
      const resp = await axios.get(
        "http://localhost:3001/api/authentication/test",
        { withCredentials: true }
      );
      if (resp.status === 200) {
        setAuthenticated(true);
      }
    } catch (err) {
      setAuthenticated(false);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
        <Route
          path="/signup"
          render={() =>
            authenticated ? <Redirect to="/home" /> : <SignUpPage />
          }
        />
        <Route
          path="/login"
          render={() =>
            authenticated ? <Redirect to="/home" /> : <LogInPage />
          }
        />
        <Route
          path="/onboarding"
          render={() =>
            authenticated ? <OnBoardingPage /> : <Redirect to="/login" />
          }
        />
        <Route path="/authorized" component={Authentication} />
        <Route
          path="/schedule-meeting"
          render={() =>
            authenticated ? <Scheduler /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/home"
          render={() => (authenticated ? <Home /> : <Redirect to="/login" />)}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
