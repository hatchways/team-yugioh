import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
<<<<<<< HEAD

import Home from "./pages/Home";
import LogInPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
=======
import LandingPage from "./pages/Landing";
>>>>>>> 6520fba0f589d8b097f28ae00b18b8bff1b08366
import CreateEvent from "./pages/CreateEvent";

import "./App.css";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
<<<<<<< HEAD
                <Route exact path="/">
                    <Redirect to="/signup" />
                </Route>
                <Route path="/signup" component={SignUpPage} />
                <Route path="/login" componzent={LogInPage} />
                <Route path="/home" componzent={Home} />
=======
                <Route exact path="/" component={LandingPage} />
>>>>>>> 6520fba0f589d8b097f28ae00b18b8bff1b08366
                <Route path="/event" component={CreateEvent} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
