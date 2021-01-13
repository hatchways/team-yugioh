import React from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";

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
      justify="flex-start"
      wrap="nowrap"
      className={classes.daysGrid}
    >
      {week.map((item, i) => {
        return (
          <FormControlLabel
            key={i}
            label={
              <Typography variant="caption" className={classes.labelText}>
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
  },
  eachDay: {
    margin: "0",
  },
  label: {
    outline: "1px lightgray solid",
    maxWidth: "4em",
    minWidth: "3.5em",
    margin: "0",
  },
}));

export default AvailableDays;
