import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import CreateEvent from "./pages/CreateEvent";

import "./App.css";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Route exact path="/" component={LandingPage} />
                <Route path="/event" component={CreateEvent} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
