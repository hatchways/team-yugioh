import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router";
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
import AppointmentDetails from "../components/scheduler/AppointmentDetails";
import Confirmation from "../components/scheduler/Confirmation";
import { getNextAvailableDate } from "../utils/calendarUtils";
import LinearProgress from "@material-ui/core/LinearProgress";

import axios from "axios";
import EventNotActivePage from "../pages/EventNotActivePage";

const Scheduler = () => {
  const classes = useStyles();
  const [path] = useState(useLocation().pathname);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({
    name: "",
    details: "",
    duration: "",
    link: "",
    userId: "",
  });
  const [appointmentDetails, setAppointmentDetails] = useState({
    eventId: "",
    name: "",
    email: "",
    notes: "",
    timezone: "UTC",
  });
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  //this will be fetched from the server
  const [availTimes, setAvailTimes] = useState({
    start: "09:00",
    end: "17:00",
  });
  const [availDates, setAvailDates] = useState([1, 2, 3, 4, 5]);
  //this will be set when picking event type --> pulled from context?
  const [interval, setInterval] = useState(60);

  //this needs to be done here rather than the date picker otherwise get pseudo race condition
  if (!availDates.includes(selectedDate.getDay())) {
    //set next available day of the week
    setSelectedDate(getNextAvailableDate(selectedDate, availDates));
  }

  const [eventActive, setEventActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Matching only the first two params so /hostname/eventname/datelinks will still work correctly
    const regex = /appt\/([%\s0-9a-z-]*\/[%\s0-9a-z-]*)/g;
    let searchUrl = path.match(regex)[0].slice(5);
    const queryURL = `/api/event_details/${encodeURI(searchUrl)}`;
    axios
      .get(queryURL)
      .then((res) => {
        // TODO: redirect to 404 page on no event found?
        if (res.data.length) {
          let event = res.data[0];
          setEventDetails({
            name: event.name,
            description: event.description,
            duration: event.duration,
            link: event.link,
            userId: event.userId,
          });
          setAppointmentDetails({ ...appointmentDetails, eventId: event._id });
          setEventActive(event.active);
          setInterval(event.duration);

          axios
            .post("/api/user/availability", { userId: event.userId })
            .then((res) => {
              setAvailDates(res.data.availableDays);
              setAvailTimes(res.data.availableTime);
            });
        } else {
          setEventActive(false);
        }
      })
      .then(() => setLoading(false));

    /* eslint-disable */
  }, []);
  /* eslint-enable */

  if (loading) {
    return <LinearProgress />;
  } else if (!eventActive) {
    return <EventNotActivePage />;
  } else {
    return (
      <Paper className={classes.root} elevation={5}>
        <Grid container direction="row" wrap="nowrap" className={classes.grid}>
          {appointmentConfirmed ? (
            <Route to={`${eventDetails.link}/${appointmentConfirmed.id}`}>
              <Confirmation
                appointmentDetails={appointmentDetails}
                eventDetails={eventDetails}
              />
            </Route>
          ) : (
            <>
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
                  <Route
                    to={`${eventDetails.link}/${encodeURI(
                      appointmentDetails.time
                    )}`}
                  >
                    <AppointmentDetails
                      appointmentDetails={appointmentDetails}
                      setAppointmentDetails={setAppointmentDetails}
                      eventDetails={eventDetails}
                      path={path}
                      setAppointmentConfirmed={setAppointmentConfirmed}
                    />
                  </Route>
                ) : (
                  <>
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
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
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
