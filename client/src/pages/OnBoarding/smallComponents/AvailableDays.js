import React from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
      {week.map((item, i) => {
        return (
          <FormControlLabel
            key={i}
            label={
              <Typography variant="subtitle2" className={classes.labelText}>
                {item}
              </Typography>
            }
            labelPlacement="bottom"
            className={classes.label}
            control={
              <Checkbox
                className={classes.eachDay}
                checked={days[item] || false}
                onChange={selectDay}
                name={item}
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
