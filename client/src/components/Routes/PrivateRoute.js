import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { testAuth } from "../../utils/googleAuth";

const PrivateRoute = ({ Component, ...rest }) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => testAuth().then(res => setAuthenticated(res)), []);

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
