import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import googleLogo from "../assets/googlesvg1.svg";
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

const GoogleLoginButton = ({email, variant }) => {
  const classes = useStyles();

  //handle response from googlAuth
  const responseGoogle = response => {
    sendToken(response, email, variant);
  };

  return (
        <Button
          size="large"
          className={classes.button}
          onClick={responseGoogle}
        >
          <span style={{ marginLeft: "20px" }}>
            <img
              src={googleLogo}
              style={{ position: "absolute", left: 45, top: 14 }}
              alt="google logo"
            />
            
            {variant==="login"?`Login with Google`:`Signup with Google`}
          </span>
        </Button>
  );
};

export default GoogleLoginButton;
