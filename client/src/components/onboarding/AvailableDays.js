import React from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";

const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
const nameOfDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const AvailableDays = (props) => {
  const classes = useStyles();

  const days = props.days;
  const setDays = props.setDays;

  const selectDay = (event) => {
    const newDays = { ...days, [event.target.name]: event.target.checked };
    setDays(newDays);
  };

  return (
    <Grid
      container
      wrap="nowrap"
      justify="space-between"
      className={classes.daysGrid}
    >
      {daysOfWeek.map((day) => {
        return (
          <FormControlLabel
            key={day}
            label={
              <Typography variant="subtitle2" className={classes.labelText}>
                {nameOfDay[day]}
              </Typography>
            }
            labelPlacement="bottom"
            className={classes.label}
            control={
              <Checkbox
                className={classes.eachDay}
                checked={days[day] || false}
                onChange={selectDay}
                name={day}
                color="primary"
              />
            }
          />
        );
      })}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  daysGrid: {
    margin: "0",
    border: "1px lightgray solid",
    borderRight: "0",
    width: "100%",
  },
  eachDay: {
    margin: "0",
  },
  label: {
    width: theme.spacing(7),
    margin: "0",
    borderRight: "1px lightgray solid",
  },
}));

AvailableDays.propTypes = {
  days: PropTypes.object,
  setDays: PropTypes.func,
};

export default AvailableDays;
