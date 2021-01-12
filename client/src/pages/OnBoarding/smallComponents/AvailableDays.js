import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  makeStyles,
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
    <Grid container direction="row" wrap="nowrap" alignItems="center">
      {week.map((item, i) => {
        return (
          <FormControlLabel
            key={i}
            label={item}
            labelPlacement="top"
            control={
              <Checkbox
                className={classes.eachDay}
                checked={daysLocal[item] || false}
                onChange={selectDay}
                name={item}
              />
            }
          />
        );
      })}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  eachDay: {
    margin: "0",
  },
}));

export default AvailableDays;
