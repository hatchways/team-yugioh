import React, { useState } from "react";
import { useParams, Route } from "react-router-dom";
import { Grid, makeStyles, Paper, Divider } from "@material-ui/core";

import Overview from "../components/scheduler/Overview";
import SelectAnOpeningSlot from "../components/scheduler/SelectAnOpeningSlot";
import ConfirmAppointment from "../components/scheduler/ConfirmAppointment";

const RescheduleEvent = () => {
  const classes = useStyles();
  const { eventId } = useParams();
  console.log("event id", eventId);
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
          <Route exact path="/reschedule/:eventId">
            <SelectAnOpeningSlot />
          </Route>
          <Route path="/reschedule/:eventId/confirm">
            <ConfirmAppointment />
          </Route>
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

export default RescheduleEvent;
