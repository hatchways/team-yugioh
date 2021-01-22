import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendCode } from "../utils/googleAuth";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  spinner: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}));

const Authentication = () => {
  const classes = useStyles();
  const search = useLocation().search;

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");

    sendCode(code);
  }, []);

  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};

export default Authentication;
