import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const authenticated = useAuth();

  if (authenticated) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
