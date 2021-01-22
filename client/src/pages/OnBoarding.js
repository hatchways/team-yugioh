import React, { useState } from "react";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { Route, Switch, Link, Redirect, useRouteMatch } from "react-router-dom";

import SetTimezoneUrl from "../components/onboarding/SetTimezoneUrl";
import ConnectGoogleCalendar from "../components/onboarding/ConnectGoogleCalendar";
import SetAvailability from "../components/onboarding/SetAvailability";
import ProgressBar from "../components/onboarding/ProgressBar";
const axios = require("axios");

const OnBoarding = () => {
  const classes = useStyles();

  // const match = useRouteMatch({ path: "/onboarding/:page" });
  const [page, setPage] = useState(1);

  const [url, setUrl] = useState("john-doe");
  const [timezone, setTimezone] = useState("");
  const [startHour, setStartHour] = useState("");
  const [finishHour, setFinishHour] = useState("");
  const [days, setDays] = useState({});

  const handleButtonClick = () => {
    setPage(page + 1);
    if (page === 3) {
      axios
        .post("/api/user/", { URL: url, timezone: timezone })
        .then((res) => console.log(res));
    }
  };

  return (
    <Paper elevation={5} className={classes.paper}>
      <div className={classes.root}>
        <Grid
          container
          item
          wrap="nowrap"
          alignItems="center"
          justify="space-between"
          className={classes.topContent}
        >
          <Typography variant="h5">
            {page === 1
              ? "Welcome to CalendApp!"
              : page === 2
              ? "Your Google calendar is connected!"
              : "Set your availability"}
          </Typography>
          <ProgressBar start={page - 1} />
        </Grid>
        <Divider />
        {page === 1 && (
          <SetTimezoneUrl
            url={url}
            setUrl={setUrl}
            timezone={timezone}
            setTimezone={setTimezone}
          />
        )}
        {page === 2 && <ConnectGoogleCalendar />}
        {page === 3 && (
          <SetAvailability
            startHour={startHour}
            setStartHour={setStartHour}
            finishHour={finishHour}
            setFinishHour={setFinishHour}
            days={days}
            setDays={setDays}
          />
        )}
        {page === 4 && <Redirect to="/home" />}
        <Grid container justify="center">
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handleButtonClick}
          >
            {page === 3 ? "Finish" : "Continue"}
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  topContent: {
    padding: "2em",
    height: "6em",
  },
  paper: {
    margin: "auto",
    width: "30em",
  },
  gridForMainContent: {
    height: "100%",
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    position: "absolute",
    bottom: "2em",
    width: "3em",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
}));

export default OnBoarding;
