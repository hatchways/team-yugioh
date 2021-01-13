import React, { useState } from "react";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";

import SetTimezoneUrl from "./SetTimezoneUrl";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import SetAvailability from "./SetAvailability";
import ProgressBar from "./smallComponents/ProgressBar";

const OnBoarding = () => {
  const classes = useStyles();

  const match = useRouteMatch({ path: "/onboarding/:page" });
  const page = match ? match.params.page : 0;

  const [url, setUrl] = useState("john-doe");
  const [timezone, setTimezone] = useState("");
  const [startHour, setStartHour] = useState("");
  const [finishHour, setFinishHour] = useState("");
  const [days, setDays] = useState({});

  return (
    <Paper elevation={5} className={classes.paper}>
      <div className={classes.mainContent}>
        <Grid
          container
          item
          wrap="nowrap"
          alignItems="center"
          justify="space-between"
          className={classes.topContent}
        >
          <Typography variant="h5">
            {page === "1"
              ? "Welcome to CalendApp!"
              : page === "2"
              ? "Your Google calendar is connected!"
              : "Set your availability"}
          </Typography>
          <ProgressBar start={page - 1} />
        </Grid>
        <Divider />
        <Switch>
          <Route path="/onboarding/1">
            <SetTimezoneUrl
              url={url}
              setUrl={setUrl}
              timezone={timezone}
              setTimezone={setTimezone}
            />
          </Route>
          <Route path="/onboarding/2">
            <ConnectGoogleCalendar />
          </Route>
          <Route path="/onboarding/3">
            <SetAvailability
              startHour={startHour}
              setStartHour={setStartHour}
              finishHour={finishHour}
              setFinishHour={setFinishHour}
              days={days}
              setDays={setDays}
            />
          </Route>
          <Route>
            <Redirect to="/onboarding/1" />
          </Route>
        </Switch>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  topContent: {
    padding: "2em",
    height: "6em",
  },
  paper: {
    margin: "auto",
    width: "30em",
  },
  mainContent: {
    flexGrow: 1,
  },
  gridForMainContent: {
    height: "100%",
  },
}));

export default OnBoarding;
