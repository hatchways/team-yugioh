import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";

import Home from "./pages/Home";
import LogInPage from "./pages/Login";
import OnBoardingPage from "./pages/OnBoarding/OnBoarding";
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
                <Route exact path="/">
                    <Redirect to="/signup" />
                </Route>
                <PublicRoute component={SignUpPage} path="/signup"/>
                <PublicRoute component={LogInPage} path="/login"/>
                <PrivateRoute component={OnBoardingPage} path="/onboarding"/>
                <Route path="/authorized" component={Authentication} />
                <PrivateRoute component={Scheduler} path="/schedule-meeting"/>
                <PrivateRoute component={Home} path="/home"/>
                <PrivateRoute component={UpgradePage} path="/upgrade"/>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
