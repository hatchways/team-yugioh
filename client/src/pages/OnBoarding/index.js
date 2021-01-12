import React, { useState, useRef } from "react";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";

import SetTimezoneUrl from "./SetTimezoneUrl";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import SetAvailability from "./SetAvailability";

const OnBoarding = (props) => {
  //styles
  const classes = useStyles();

  //data related variables
  const [pageNum, setPageNum] = useState(0);
  const url = useRef();
  const timezone = useRef();
  const days = useRef();
  const startHour = useRef();
  const finishHour = useRef();

  const FlipToNextPage = () => {
    //send data to backend here

    if (pageNum === 2) {
      //redirect to somewhere
    } else {
      setPageNum(Math.min(2, pageNum + 1));
    }
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.mainContent}>
        {pageNum === 0 && <SetTimezoneUrl url={url} timezone={timezone} />}
        {pageNum === 1 && <ConnectGoogleCalendar />}
        {pageNum === 2 && (
          <SetAvailability
            days={days}
            startHour={startHour}
            finishHour={finishHour}
          />
        )}
      </div>

      <Grid container justify="center">
        <Button
          onClick={FlipToNextPage}
          className={classes.continueButton}
          color="primary"
          variant="contained"
        >
          {pageNum === 2 ? "Finish" : "Continue"}
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
