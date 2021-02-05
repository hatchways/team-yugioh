import React, { useState } from "react";
import {
  Checkbox,
  Grid,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";

const AvailableDays = ({ setDays }) => {
  const classes = useStyles();
  const [weekDays, setWeekDays] = useState([
    { name: "Sunday", checked: false },
    { name: "Monday", checked: false },
    { name: "Tuesday", checked: false },
    { name: "Wednesday", checked: false },
    { name: "Thursday", checked: false },
    { name: "Friday", checked: false },
    { name: "Saturday", checked: false },
  ]);

  const selectDay = (event) => {
    const tempWeekDays = [...weekDays];
    const dayIndex = parseInt(event.target.name);

    if (!weekDays[dayIndex].checked) {
      tempWeekDays[dayIndex].checked = true;
    } else {
      tempWeekDays[dayIndex].checked = false;
    }

    const newDays = tempWeekDays.flatMap((day, i) => (day.checked ? [i] : []));
    setDays([...newDays]);
    setWeekDays([...tempWeekDays]);
  };

  return (
    <Grid
      container
      wrap="nowrap"
      justify="space-between"
      className={classes.daysGrid}
    >
      {weekDays.map(({ name, checked }, i) => {
        return (
          <FormControlLabel
            key={name}
            label={
              <Typography variant="subtitle2" className={classes.labelText}>
                {name}
              </Typography>
            }
            labelPlacement="bottom"
            className={classes.label}
            control={
              <Checkbox
                className={classes.eachDay}
                checked={checked}
                onChange={selectDay}
                name={i}
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
  days: PropTypes.array,
  setDays: PropTypes.func,
};

export default AvailableDays;
