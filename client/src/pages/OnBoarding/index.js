import React, { useState, useRef } from "react";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import {
  Route,
  useHistory,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import SetTimezoneUrl from "./SetTimezoneUrl";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import SetAvailability from "./SetAvailability";

const OnBoarding = (props) => {
  //styles
  const classes = useStyles();

  //data related variables
  const url = useRef();
  const timezone = useRef();
  const days = useRef();
  const startHour = useRef();
  const finishHour = useRef();
  const history = useHistory();
  const match = useRouteMatch({ path: "/onboarding/:page" });
  const page = match ? match.params.page : 0;

  const FlipToNextPage = () => {
    switch (page) {
      case "1":
        history.push("/onboarding/2");
        break;
      case "2":
        history.push("/onboarding/3");
        break;
      default:
        break;
    }
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.mainContent}>
        <Switch>
          <Route path="/onboarding/1">
            <SetTimezoneUrl url={url} timezone={timezone} />
          </Route>
          <Route path="/onboarding/2">
            <ConnectGoogleCalendar />
          </Route>
          <Route path="/onboarding/3">
            <SetAvailability
              days={days}
              startHour={startHour}
              finishHour={finishHour}
            />
          </Route>
          <Route>
            <Redirect to="/onboarding/1" />
          </Route>
        </Switch>
      </div>

      <Grid container justify="center">
        <Button
          onClick={FlipToNextPage}
          className={classes.continueButton}
          color="primary"
          variant="contained"
        >
          {page === "2" ? "Finish" : "Continue"}
        </Button>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    width: "30em",
    height: "25em",
  },
  mainContent: {
    height: "20em",
    flexGrow: 1,
  },
  gridForMainContent: {
    height: "100%",
  },
}));

export default OnBoarding;
