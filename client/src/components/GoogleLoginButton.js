import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import googleLogo from "../assets/googlesvg1.svg";
import GoogleLogin from "react-google-login";
import { sendToken } from "../utils/googleAuth";

const useStyles = makeStyles(theme => ({
  button: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    marginTop: "15%",
    marginBottom: "10%"
  }
}));

const GoogleLoginButton = ({ email, variant }) => {
  const classes = useStyles();

  //handle response from googlAuth
  const responseGoogle = response => {
    sendToken(response, email, variant);
  };

  return (
    <GoogleLogin
      clientId="294753578980-nbeunl8bovad0pp6t4ve8p5vso2hiahg.apps.googleusercontent.com"
      render={renderProps => (
        <Button
          size="large"
          className={classes.button}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <span style={{ marginLeft: "20px" }}>
            <img
              src={googleLogo}
              style={{ position: "absolute", left: 45, top: 14 }}
              alt="google logo"
            />
            Login with Google
          </span>
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      accessType={"offline"}
      responseType={"code"}
    />
  );
};

export default GoogleLoginButton;
