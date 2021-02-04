// Esssentially a copy of the `Scheduler.js` component

import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Divider,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

import Overview from "./scheduler/Overview";
import PickDate from "./scheduler/PickDate";
import PickTime from "./scheduler/PickTime";
import AppointmentDetails from "./scheduler/AppointmentDetails";
import EventNotActivePage from "./scheduler/EventNotActivePage";
import Confirmation from "./scheduler/Confirmation";
import { getNextAvailableDate } from "../utils/calendarUtils";

const domain = "http://localhost:3000";
const Scheduler = ({ hostName, eventName }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({});
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [eventActive, setEventActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  //this will be fetched from the server
  const availTimes = { start: "09:00", end: "17:00" };
  const availDates = [1, 2, 3, 4, 5];
  //this will be set when picking event type --> pulled from context?
  const interval = 60;

  //this needs to be done here rather than the date picker otherwise get pseudo race condition
  if (!availDates.includes(selectedDate.getDay())) {
    //set next available day of the week
    setSelectedDate(getNextAvailableDate(selectedDate, availDates));
  }

  useEffect(() => {
    const queryURL = `${domain}/api/event_details/${encodeURIComponent(
      hostName
    )}/${encodeURIComponent(eventName)}`;
    axios
      .get(queryURL)
      .then((res) => {
        //
        // TODO: redirect to 404 page on no event found?
        if (res.data.length) {
          let event = res.data[0];
          console.log("event3", event);
          setEventDetails({
            name: event.name,
            description: event.description,
            duration: event.duration,
            link: event.link,
            userId: event.userId,
          });
          setAppointmentDetails({ ...appointmentDetails, eventId: event._id });
          setEventActive(event.active);
        } else {
          setEventActive(false);
        }
      })
      .then(() => setLoading(false));
  }, [hostName, eventName]);

  if (loading) {
    return <LinearProgress />;
  } else if (!eventActive) {
    return <EventNotActivePage />;
  } else if (appointmentConfirmed) {
    return (
      <Paper className={classes.root} elevation={5}>
        <Confirmation
          appointmentDetails={appointmentDetails}
          eventDetails={eventDetails}
        />
      </Paper>
    );
  } else if (page === 2) {
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

          <Grid item xs={8}>
            <AppointmentDetails
              appointmentDetails={appointmentDetails}
              setAppointmentDetails={setAppointmentDetails}
              eventDetails={eventDetails}
              appointmentConfirmed={appointmentConfirmed}
              setAppointmentConfirmed={setAppointmentConfirmed}
              setSelectedDate={setSelectedDate}
              eventLink={eventDetails.link}
              interval={interval}
              availabilityTimes={availTimes}
              setPage={setPage}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
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
                  availability={availDates}
                />
                <Typography variant="subtitle2">
                  Coordinated Universal Time
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <PickTime
                  selectedDate={selectedDate}
                  appointmentDetails={appointmentDetails}
                  setAppointmentDetails={setAppointmentDetails}
                  eventDetails={eventDetails}
                  setSelectedDate={setSelectedDate}
                  interval={interval}
                  availabilityTimes={availTimes}
                  setPage={setPage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
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
