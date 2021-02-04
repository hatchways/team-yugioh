import React, { useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
import RescheduleOrCancelAppointmentPage from "./pages/reschedule/RescheduleOrCancelAppointmentPage";
import AppointmentDoesNotExistOrCancelled from "./pages/reschedule/AppointmentDoesNotExistOrCancelled";
import UserManagementPage from "./pages/UserManagement";

import "./App.css";

function App() {
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
          <PrivateRoute exact path="/">
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

          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
