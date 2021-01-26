import React, { useEffect } from "react";
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
import Checkout from "./pages/Checkout";
import { useSetAuthenticated } from "./providers/Context";
import axios from "axios";

import "./App.css";

function App() {
  const setAuthenticated = useSetAuthenticated();
  useEffect(() => {
    axios
      .get("/api/authentication/test", { withCredentials: true })
      .then(() => {
        setAuthenticated(true);
      })
      .catch();
  }, []);
  return (
    <MuiThemeProvider theme={theme}>

      <BrowserRouter>
        <Route path="/appt">
          <Scheduler />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route path="/authorized">
          <Authentication />
        </Route>
        <PrivateRoute path="/onboarding">
          <OnBoardingPage />
        </PrivateRoute>
        <Route path="/schedule-meeting">
          <Scheduler />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/upgrade">
          <UpgradePage />
        </PrivateRoute>
        <PrivateRoute path="/checkout">
          <Checkout />
        </PrivateRoute>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
