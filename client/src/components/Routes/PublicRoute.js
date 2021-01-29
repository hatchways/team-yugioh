import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const PublicRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={<children {...props} />} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  Component: PropTypes.any,
};

export default PublicRoute;
