import React, { useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import Home from "./pages/Home";
import LogInPage from "./pages/Login";
import OnBoardingPage from "./pages/OnBoarding";
import SignUpPage from "./pages/Signup";
import Scheduler from "./pages/Scheduler";
import Authentication from "./pages/Authentication";
import UpgradePage from "./pages/UpgradePage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Checkout from "./pages/Checkout";
import { useSetAuthenticated } from "./providers/Context";
import RescheduleOrCancelAppointmentPage from "./pages/reschedule/RescheduleOrCancelAppointmentPage";
import AppointmentDoesNotExistOrCancelled from "./pages/reschedule/AppointmentDoesNotExistOrCancelled";
import axios from "axios";
import UserManagementPage from "./pages/UserManagement";

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
        <Switch>
          <Route path="/appt/:hostName/:eventName">
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
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/upgrade">
            <UpgradePage />
          </PrivateRoute>
          <PrivateRoute path="/teams">
            <UserManagementPage />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route path="/appointment/reschedule/:appointmentId">
            <RescheduleOrCancelAppointmentPage variant="reschedule" />
          </Route>
          <Route path="/appointment/cancel/:appointmentId">
            <RescheduleOrCancelAppointmentPage variant="cancel" />
          </Route>
          <Route path="/appointment/cancelled">
            <AppointmentDoesNotExistOrCancelled variant="cancelled" />
          </Route>
          <Route path="/appointment/does-not-exist">
            <AppointmentDoesNotExistOrCancelled variant="doesNotExist" />
          </Route>
          <Route path="/404">
            <PageNotFound />
          </Route>
          <Route exact path="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
