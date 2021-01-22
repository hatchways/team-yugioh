import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";

import Home from "./pages/Home";
import LogInPage from "./pages/Login";
import OnBoardingPage from "./pages/OnBoarding";
import SignUpPage from "./pages/Signup";
import Scheduler from "./pages/Scheduler";
import Authentication from "./pages/Authentication";
import UpgradePage from "./pages/UpgradePage";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/appt">
          <Scheduler />
        </Route>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
        <Route path="/authorized" component={Authentication} />
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route path="/onboarding">
          <OnBoardingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/upgrade">
          <UpgradePage />
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
