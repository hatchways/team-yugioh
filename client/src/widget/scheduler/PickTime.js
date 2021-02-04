import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, ListItem, makeStyles, Typography } from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";
import { format, parse } from "date-fns";
import PropTypes from "prop-types";
import axios from "axios";
import { getTimeSlots } from "../../utils/calendarUtils";

const PickTime = ({
  selectedDate,
  appointmentDetails,
  setAppointmentDetails,
  eventDetails,
  interval,
  availabilityTimes,
}) => {
  const classes = useStyles();
  const date = format(selectedDate, "EEEE, LLL do");
  const { link, userId } = eventDetails;

  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    let isoDate = new Date(selectedDate);
    isoDate.setHours(0, 0, 0, 0);
    isoDate = isoDate.toISOString();
    //fetch from backend
    axios
      .post(`/api/calendar/availability?day=${isoDate}`, {
        members: [userId],
      })
      .then((res) => {
        console.log(
          "timeslot",
          getTimeSlots(res.data.availability, interval, availabilityTimes)
        );
        setTimeSlots(
          getTimeSlots(res.data.availability, interval, availabilityTimes)
        );
      })
      .catch((err) => console.log("errorrrr", err));
  }, [availabilityTimes, interval, selectedDate]);

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      wrap="nowrap"
      spacing={2}
      alignItems="center"
    >
      <Grid item>
        <Typography variant="body1">{date}</Typography>
      </Grid>

      <Grid
        item
        className={classes.list}
        container
        direction="column"
        alignItems="center"
        wrap="nowrap"
      >
        {timeSlots.length !== 0 &&
          timeSlots.map((slot, i) => (
            <Link
              to={`/appt/${link}/${encodeURI(
                parse(date + " " + slot, "EEEE, LLL do HH:mm", new Date())
              )}`}
              className={classes.schedLink}
              key={i}
            >
              <ListItem
                className={classes.listItem}
                button
                onClick={() =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    time: parse(
                      date + " " + slot,
                      "EEEE, LLL do HH:mm",
                      new Date()
                    ),
                  })
                }
              >
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Brightness1 color="primary" className={classes.icon} />
                  <Typography>{slot}</Typography>
                </Grid>
              </ListItem>
            </Link>
          ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  list: {
    overflowY: "scroll",
    height: theme.spacing(40),
  },
  icon: {
    width: theme.spacing(1.4),
    height: theme.spacing(1.4),
  },
  listItem: {
    borderColor: theme.palette.text.hint,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    height: theme.spacing(5),
    margin: `${theme.spacing(0.5)}px 0`,
    width: theme.spacing(15),
  },
  schedLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

PickTime.propTypes = {
  selectedDate: PropTypes.object,
  appointmentDetails: PropTypes.object,
  setAppointmentDetails: PropTypes.func,
  eventLink: PropTypes.string,
  interval: PropTypes.number,
  availabilityTimes: PropTypes.object,
};

export default PickTime;
