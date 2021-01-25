import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Divider,
  Typography,
  Button,
  TextField,
  InputLabel,
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
  const [appointmentDetails, setAppointmentDetails] = useState({
    eventId: "",
    name: "",
    email: "",
    notes: "",
    time: false,
    timezone: "UTC",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
    console.log(appointmentDetails);
  };

  const createAppointment = () => {
    axios.post("/api/appointment", appointmentDetails).then((res) => {
      setAppointmentDetails({
        eventId: "",
        name: "",
        email: "",
        notes: "",
        time: false,
        timezone: "UTC",
      });
    });
  };

  useEffect(() => {
    let queryURL = `/api/event_details/${window.location.pathname.slice(6)}`;
    axios.get(queryURL).then((res) => {
      console.log(res);
      // TODO: redirect to 404 page on no event found?
      let event = res.data[0];
      setEventDetails({
        name: event.name,
        description: event.description,
        duration: event.duration,
      });
      setAppointmentDetails({ ...appointmentDetails, eventId: event._id });
    });
  }, []);

  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Grid item xs={4}>
          <Overview
            {...eventDetails}
            appointmentTime={appointmentDetails.time}
          />
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
          {appointmentDetails.time ? (
            <>
              <Button
                onClick={() =>
                  setAppointmentDetails({ ...appointmentDetails, time: false })
                }
              >
                Back
              </Button>
              <Grid
                direction="row"
                alignItems="center"
                container
                justify="flex-start"
                className={classes.inputRow}
              >
                <Grid xs="2" item>
                  <InputLabel className={classes.label}>Name</InputLabel>
                </Grid>

                <Grid xs="10" item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="name"
                    type="text"
                    onChange={handleFormChange}
                    fullWidth
                    value={appointmentDetails.name}
                  />
                </Grid>
              </Grid>
              <Grid
                direction="row"
                alignItems="center"
                container
                justify="flex-start"
                className={classes.inputRow}
              >
                <Grid xs="2" item>
                  <InputLabel className={classes.label}>Email</InputLabel>
                </Grid>

                <Grid xs="10" item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="email"
                    type="text"
                    onChange={handleFormChange}
                    fullWidth
                    value={appointmentDetails.email}
                  />
                </Grid>
              </Grid>
              <Grid
                direction="row"
                alignItems="center"
                container
                justify="flex-start"
                className={classes.inputRow}
              >
                <Grid xs="2" item>
                  <InputLabel className={classes.descriptionLabel}>
                    Notes
                  </InputLabel>
                </Grid>

                <Grid xs="10" item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="notes"
                    multiline
                    onChange={handleFormChange}
                    fullWidth
                    value={appointmentDetails.notes}
                    placeholder={`Write any details that will help prepare for our meeting.
                                    
                                    
                                    `}
                    className={classes.textArea}
                  />
                </Grid>
              </Grid>

              <Button
                color="primary"
                className={classes.button}
                onClick={createAppointment}
              >
                Schedule Event
              </Button>
            </>
          ) : (
            <>
              <Grid item>
                <Typography variant="h5" className={classes.title}>
                  Select a Date {"&"} Time
                </Typography>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={7}>
                  <PickDate selectedDate={selectedDate} />
                  <Typography variant="subtitle2">
                    Coordinated Universal Time
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <PickTime
                    selectedDate={selectedDate}
                    appointmentDetails={appointmentDetails}
                    setAppointmentDetails={setAppointmentDetails}
                    setSelectedDate={setSelectedDate}
                  />
                </Grid>
              </Grid>
            </>
          )}
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
