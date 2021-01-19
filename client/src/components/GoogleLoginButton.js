import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import googleLogo from "../assets/googlesvg1.svg";
import { sendToken } from "../utils/googleAuth";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
  button: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    marginTop: "15%",
    marginBottom: "10%"
  },
  img: {
    position: "absolute",
    left: 45,
    top: 14
  },
  btnTxt: {
    marginLeft: "20px"
  }
}));

const GoogleLoginButton = ({ variant }) => {
  const classes = useStyles();
  const { setAuthenticated } = useContext(AuthContext);

  //handle response from googlAuth
  const responseGoogle = async () => {
    sendToken(setAuthenticated);
  };

  return (
    <Button size="large" className={classes.button} onClick={responseGoogle}>
      <span className={classes.btnTxt}>
        <img src={googleLogo} className={classes.img} alt="google logo" />

        {variant === "login" ? `Login with Google` : `Signup with Google`}
      </span>
    </Button>
  );
};

export default GoogleLoginButton;
