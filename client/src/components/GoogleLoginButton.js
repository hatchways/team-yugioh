import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import googleLogo from "../assets/googlesvg1.svg";
import GoogleLogin from "react-google-login";
import {sendToken} from "../utils/googleAuth";

const useStyles = makeStyles(theme => ({
  button: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    marginTop: "15%",
    marginBottom: "10%"
  }
}));

const GoogleLoginButton = () => {
  const classes = useStyles();

  //handle response from googlAuth
  const responseGoogle = response => {
    console.log(response);
    sendToken(response);
  };

  return (
    <GoogleLogin
      clientId="294753578980-i012ql1tm9kdb12efug6kn5qp0s87hm6.apps.googleusercontent.com"
      render={renderProps => (
        <Button size="large" className={classes.button} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            
          <span style={{ marginLeft: "20px" }}>
            <img
              src={googleLogo}
              style={{ position: "absolute", left: 45, top: 14 }}
            />
            Login with Google
          </span>
      </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
