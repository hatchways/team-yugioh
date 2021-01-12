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
    switch (pageNum) {
      case 0:
        console.log(
          `Send data to backend (todo). \n url: ${url.current}, \n timezone: ${timezone.current}`
        );
        setPageNum(pageNum + 1);
        break;
      case 1:
        setPageNum(pageNum + 1);
        break;
      case 2:
        console.log(
          `Send data to backend (todo). \n available days: ${days.current}\n
          available hour start: ${startHour.current}\n
          available hour end: ${finishHour.current}`
        );
        console.log("Redirect user to somewhere (todo)");
        break;
      default:
        break;
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
