import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useAuth } from "../../providers/Context";

const PrivateRoute = ({ children, ...rest }) => {
  const authenticated = useAuth();
  return authenticated && <Route {...rest}>{children}</Route>;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
