import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { useAuth, useAuthLoading } from "../../providers/Context";

const PrivateRoute = ({ children, ...rest }) => {
  const authenticated = useAuth();
  const loading = useAuthLoading();
  return (
    !loading && (
      <>
        {authenticated && <Route {...rest}>{children}</Route>}
        {!authenticated && <Redirect to="/login" />}
      </>
    )
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
