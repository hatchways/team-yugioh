import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { testAuth } from "../../utils/googleAuth";
import axios from "axios";

const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [onboarded, setOnboarded] = useState();

  useEffect(() => {
    testAuth()
      .then((res) => {
        setAuthenticated(res);
        axios.get("/api/user/is_onboarded").then((res) => {
          res.data === "" ? setOnboarded(false) : setOnboarded(true);
        });
      })
      .catch(() => {
        setRedirect(true);
      });
  }, []);
  if (redirect) {
    return <Redirect to="/login" />;
  } else if (!onboarded) {
    return <Redirect to="/onboarding" />;
  } else {
    return authenticated && <Route {...rest}>{children}</Route>;
  }
};

export default PrivateRoute;
