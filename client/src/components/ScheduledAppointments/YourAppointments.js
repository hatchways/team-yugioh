import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const YourAppointments = ({ upcoming, empty }) => {
  const classes = useStyles();
  if (empty) {
    return (
      <Typography className={classes.text} variant="body2">
        You do not have any {upcoming ? "upcoming" : "past"} appointments
      </Typography>
    );
  } else {
    return (
      <Typography className={classes.text} variant="h4">
        Your {upcoming ? "upcoming" : "past"} appointments
      </Typography>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(2),
  },
}));

export default YourAppointments;
