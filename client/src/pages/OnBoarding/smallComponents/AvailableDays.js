import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  makeStyles,
  ButtonGroup,
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

  const days = props.days; //useRef object
  const [daysLocal, setDays] = useState({});

  const selectDay = (event) => {
    const newDays = { ...daysLocal, [event.target.name]: event.target.checked };
    setDays(newDays);
  };

  useEffect(() => {
    const availableDays = Object.entries(daysLocal)
      .filter((entry) => entry[1] === true)
      .map((entry) => entry[0]);
    days.current = availableDays;
  }, [daysLocal, days]);

  return (
    <Grid container justify="center" wrap="nowrap" className={classes.daysGrid}>
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
                checked={daysLocal[item] || false}
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
    width: "4em",
    margin: "0",
  },
}));

export default AvailableDays;
