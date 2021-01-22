import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
import Overview from "../components/scheduler/Overview";
import PickDate from "../components/scheduler/PickDate";
import PickTime from "../components/scheduler/PickTime";
import axios from "axios";

const Scheduler = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({
    name: "",
    details: "",
    duration: "",
  });

  useEffect(() => {
    let queryURL = `/api/event_details/${window.location.pathname.slice(6)}`;
    axios.get(queryURL).then((res) => {
      // TODO: redirect to 404 page on no event found?
      let event = res.data[0];
      setEventDetails({
        name: event.name,
        description: event.description,
        duration: event.duration,
      });
      console.log(eventDetails);
    });
  }, []);

  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Grid item xs={4}>
          <Overview {...eventDetails} />
        </Grid>
        <Divider orientation="vertical" flexItem={true} />

        <Grid
          item
          xs={8}
          className={classes.dateTimeSelect}
          container
          direction="column"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              Select a Date {"&"} Time
            </Typography>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={7}>
              <PickDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <Typography variant="subtitle2">
                Coordinated Universal Time
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <PickTime selectedDate={selectedDate} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: theme.spacing(60),
      width: theme.spacing(100),
      margin: `${theme.spacing(10)}px auto`,
    },
    grid: {
      height: "100%",
    },
    title: {},
    dateTimeSelect: {
      padding: theme.spacing(3),
    },
  };
});

export default Scheduler;
