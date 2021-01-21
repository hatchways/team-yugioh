import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { testAuth } from "../../utils/googleAuth";
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    testAuth()
      .then((res) => {
        setAuthenticated(res);
      })
      .catch(() => {
        history.push("/signup");
      });
  }, []);

  return authenticated && <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
