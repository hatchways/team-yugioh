import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, makeStyles, Paper, Divider } from "@material-ui/core";

import Overview from "../components/scheduler/Overview";
import RescheduleCancel from "../components/scheduler/RescheduleCancel";

const RescheduleOrCancelEvent = ({ reschedule }) => {
  const { eventId } = useParams();
  const classes = useStyles();

  const [eventDetails, setEventDetails] = useState({
    name: "",
    details: "",
    duration: "",
    link: "",
    appointmentTime: "",
  });

  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Grid item xs={4}>
          <Overview {...eventDetails} />
        </Grid>

        <Divider orientation="vertical" flexItem={true} />

        <Grid item xs={8}>
          <RescheduleCancel reschedule={reschedule} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(60),
    width: theme.spacing(100),
    margin: `${theme.spacing(10)}px auto`,
  },
  grid: {
    height: "100%",
  },
}));

export default RescheduleOrCancelEvent;
