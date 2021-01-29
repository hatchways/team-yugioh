import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { testAuth } from "../../utils/googleAuth";
import { UserContext } from "../../providers/Context";

const PublicRoute = ({ children, ...rest }) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => testAuth().then((res) => setAuthenticated(res)), []);

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
