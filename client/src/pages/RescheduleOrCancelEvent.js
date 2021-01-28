import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, makeStyles, Paper, Divider } from "@material-ui/core";
import axios from "axios";

import Overview from "../components/scheduler/Overview";
import RescheduleCancel from "../components/scheduler/RescheduleCancel";

const RescheduleOrCancelAppointmentPage = ({ reschedule }) => {
  const { appointmentId } = useParams();
  const classes = useStyles();

  const [appointmentExists, setAppointmentExists] = useState(true);

  const [appointmentDetails, setAppointmentDetails] = useState({
    eventName: "",
    duration: "",
    eventUrl: "",
    appointmentTime: "",
    eventDescription: "",
  });

  useEffect(() => {
    axios
      .get(`/api/appointment/detail/${appointmentId}`)
      .then((res) => {
        // res.data: {eventUrl, duration, attendeeName, eventName, time, eventDescription}
        setAppointmentDetails(res.data);
      })
      .catch(() => {
        setAppointmentExists(false);
      });
  }, [appointmentId]);

  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Grid item xs={4}>
          <Overview
            name={appointmentDetails.eventName}
            duration={appointmentDetails.duration}
            description={appointmentDetails.eventDescription}
            appointmentTime={appointmentDetails.appointmentTime}
          />
        </Grid>

        <Divider orientation="vertical" flexItem={true} />

        <Grid item xs={8}>
          <RescheduleCancel
            reschedule={reschedule}
            appointmentId={appointmentId}
            eventUrl={appointmentDetails.eventUrl}
          />
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

export default RescheduleOrCancelAppointmentPage;
