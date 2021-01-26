import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, ListItem, makeStyles, Typography } from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";
import { format, parse } from "date-fns";
import PropTypes from "prop-types";

const PickTime = ({
  selectedDate,
  appointmentDetails,
  setAppointmentDetails,
  eventLink,
}) => {
  const classes = useStyles();
  const date = format(selectedDate, "EEEE, LLL do");

  const [timeSlots, setTimeSlots] = useState([]);
  useEffect(() => {
    //fetch from backend

    setTimeSlots([
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
    ]);
  }, [date]);

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
              to={`/appt/${eventLink}/${encodeURI(
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
};

export default PickTime;
