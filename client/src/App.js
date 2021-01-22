import React, { createContext, useState, useEffect } from "react";
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
import { testAuth } from "./utils/googleAuth";
import axios from "axios";

import "./App.css";

export const UserContext = createContext();

function App() {
  const [userState, setUserState] = useState({
    loggedIn: false,
    onboarded: true,
  });

  useEffect(() => {
    testAuth()
      .then(async (res) => {
        await axios.get("/api/user/get_url").then((res) => {
          if (res.data === "") {
            setUserState({ loggedIn: true, onboarded: false });
          } else {
            setUserState({ loggedIn: true, onboarded: true });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/appt">
          <Scheduler />
        </Route>
        <UserContext.Provider value={userState}>
          <Route exact path="/">
            {userState.loggedIn ? <Home /> : <SignUpPage />}
          </Route>
          <Route path="/authorized" component={Authentication} />
          <Route path="/signup">
            {userState.loggedIn ? <Home /> : <SignUpPage />}
          </Route>
          <Route path="/login">
            {userState.loggedIn ? <Home /> : <LogInPage />}
          </Route>
          <Route path="/onboarding">
            <OnBoardingPage />
          </Route>
          <Route path="/home">
            {userState.loggedIn ? (
              userState.onboarded ? (
                <Home />
              ) : (
                <OnBoardingPage />
              )
            ) : (
              <SignUpPage />
            )}
          </Route>
          <Route path="/upgrade">
            <UpgradePage />
          </Route>
        </UserContext.Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
