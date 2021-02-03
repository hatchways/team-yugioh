import React from "react";
import LoadingScreen from "./LoadingScrean";

const WithSpinner = WrappedComponent => ({
  isloading,
  styles,
  ...otherProps
}) => {
  return isloading ? <LoadingScreen /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
