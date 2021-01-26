import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendCode } from "../utils/googleAuth";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const Authentication = () => {
  const search = useLocation().search;

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    return axios
      .post("/api/authentication/google", { code }, { withCredentials: true })
      .then(() => {
        window.close();
      });
  }, []);

  return <div></div>;
};

export default Authentication;
