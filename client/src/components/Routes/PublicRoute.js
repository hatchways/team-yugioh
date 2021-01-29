import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ children, ...rest }) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/home" /> : <children {...props} />
      }
    />
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  Component: PropTypes.any,
};

export default PublicRoute;
