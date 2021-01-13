import React from "react";
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

const OnBoarding = (props) => {
  const classes = useStyles();

  const match = useRouteMatch({ path: "/onboarding/:page" });
  const page = match ? match.params.page : 0;

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.mainContent}>
        <Grid
          container
          item
          wrap="nowrap"
          alignItems="center"
          justify="space-between"
          className={classes.topContent}
        >
          <Typography variant="h6">
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
            <SetTimezoneUrl />
          </Route>
          <Route path="/onboarding/2">
            <ConnectGoogleCalendar />
          </Route>
          <Route path="/onboarding/3">
            <SetAvailability />
          </Route>
          <Route>
            <Redirect to="/onboarding/1" />
          </Route>
        </Switch>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
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
