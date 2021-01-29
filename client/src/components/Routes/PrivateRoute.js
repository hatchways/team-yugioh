import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../providers/Context";

const PrivateRoute = ({ children, ...rest }) => {
  const authenticated = useAuth();
  return authenticated && <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
