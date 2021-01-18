import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { testAuth } from "../../utils/googleAuth";
import {AuthContext} from "../../providers/AuthProvider";

const PublicRoute = ({ Component, ...rest }) => {
  const {authenticated, setAuthenticated}=useContext(AuthContext);
  
  useEffect(() => testAuth().then(res => setAuthenticated(res)), []);
  
  return (
    <Route
      {...rest}
      render={props =>
        authenticated? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
