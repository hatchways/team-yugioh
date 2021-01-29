import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  }, [search]);

  return <div></div>;
};

export default Authentication;
