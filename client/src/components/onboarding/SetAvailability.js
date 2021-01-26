import React from "react";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AvailableHours from "./AvailableHoursButton";
import AvailableDays from "./AvailableDays";

const SetAvailability = (props) => {
  const classes = useStyles();

  const {
    startHour,
    setStartHour,
    finishHour,
    setFinishHour,
    days,
    setDays,
  } = props;

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.entry}>
        <Typography className={classes.entryText} variant="subtitle1">
          Available hours
        </Typography>

        <Grid container item spacing={4} alignItems="center">
          <Grid item>
            <AvailableHours hour={startHour} setHour={setStartHour} />
          </Grid>
          <div className={classes.dash}>&ndash;</div>
          <Grid item>
            <AvailableHours hour={finishHour} setHour={setFinishHour} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="column" className={classes.entry}>
        <Typography className={classes.entryText} variant="subtitle1">
          Available days
        </Typography>
        <Grid item>
          <AvailableDays days={days} setDays={setDays} />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    height: "20em",
  },
  entryText: {
    margin: "0.05em 0",
  },
  entry: {
    padding: "0.75em 2em",
  },
  pageThreeMain: {
    margin: "1em 0",
  },
  daysGrid: {
    padding: "0",
    margin: "0",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  finishButton: {
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
    position: "absolute",
    bottom: "2em",
    width: "3em",
  },
  dash: {
    fontSize: theme.spacing(3),
  },
}));

SetAvailability.propTypes = {
  startHour: PropTypes.string,
  setStartHour: PropTypes.func,
  finishHour: PropTypes.string,
  setFinishHour: PropTypes.func,
  days: PropTypes.object,
  setDays: PropTypes.func,
};

export default SetAvailability;
