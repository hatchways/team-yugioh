import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { testAuth } from "../../utils/googleAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    testAuth()
      .then((res) => {
        setAuthenticated(res);
      })
      .catch(() => {
        setRedirect(true);
      });
  }, []);
  if (redirect) {
    return <Redirect to="/login" />;
  } else {
    return authenticated && <Route {...rest}>{children}</Route>;
  }
};

export default PrivateRoute;
