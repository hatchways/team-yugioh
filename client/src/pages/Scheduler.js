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
  const [appointmentTime, setAppointmentTime] = useState(false);
  const [bookerDetails, setBookerDetails] = useState({
    name: "",
    email: "",
    notes: "",
  });

  const handleFormChange = () => {};

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
    });
  }, []);

  return (
    <Paper className={classes.root} elevation={5}>
      <Grid container direction="row" wrap="nowrap" className={classes.grid}>
        <Grid item xs={4}>
          <Overview {...eventDetails} appointmentTime={appointmentTime} />
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
          {appointmentTime ? (
            <>
              <Button onClick={() => setAppointmentTime(false)}>Back</Button>
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
                    disableUnderline
                    fullWidth
                    value={bookerDetails.name}
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
                    disableUnderline
                    fullWidth
                    value={bookerDetails.email}
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
                    name="description"
                    multiline
                    onChange={handleFormChange}
                    fullWidth
                    value={bookerDetails.description}
                    placeholder={`Write any details that will help prepare for our meeting.
                                    
                                    
                                    `}
                    className={classes.textArea}
                  />
                </Grid>
              </Grid>

              <Button color="primary" className={classes.button}>
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
                    setAppointmentTime={setAppointmentTime}
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
