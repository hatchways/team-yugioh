import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import googleLogo from "../assets/googlesvg1.svg";
import { sendToken } from "../utils/googleAuth";
import { useHistory } from "react-router-dom";
import { useAuth, useSetAuthenticated } from "../providers/Context";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    marginTop: "15%",
    marginBottom: "10%",
  },
  img: {
    position: "absolute",
    left: 45,
    top: 14,
  },
  btnTxt: {
    marginLeft: "20px",
  },
}));

const GoogleLoginButton = ({ variant }) => {
  const setAuthenticated = useSetAuthenticated();
  const authenticated = useAuth();
  const classes = useStyles();

  //handle response from googlAuth
  const initGoogleLogin = async () => {
    const response = await fetch("/api/authentication/geturl", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });
    const content = await response.json();
    window.open(content.url);

    const idSetInterval = setInterval(() => {
      axios
        .get("/api/authentication/test", { withCredential: true })
        .then(() => {
          setAuthenticated(true);
          clearInterval(idSetInterval);
        })
        .catch();
    }, 1000);
  };
  if (authenticated) {
    return <Redirect to="/onboarding" />;
  } else {
    return (
      <Button size="large" className={classes.button} onClick={initGoogleLogin}>
        <span className={classes.btnTxt}>
          <img src={googleLogo} className={classes.img} alt="google logo" />

          {variant === "login" ? `Login with Google` : `Signup with Google`}
        </span>
      </Button>
    );
  }
};

export default GoogleLoginButton;
