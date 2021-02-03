import React from "react";
import { TextField, MenuItem, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const timeSlots = [];
for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? "0" + i.toString() : i.toString();
  timeSlots.push(hour + ":00" + min);
}

const AvailableHoursBtn = (props) => {
  const setHour = props.setHour;
  const hour = props.hour;

  const classes = useStyles();

  const selectHour = (event) => {
    setHour(event.target.value);
  };

  return (
    <TextField
      select
      value={hour}
      onChange={selectHour}
      className={classes.menu}
      variant="outlined"
      size="small"
    >
      {timeSlots.map((time, i) => {
        return (
          <MenuItem key={i} value={time}>
            {`${time.slice(0, 1)}${time.slice(1, 2)} : 
            ${time.slice(2, 3)}${time.slice(3, 4)}`}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

const useStyles = makeStyles(() => ({
  menu: {
    width: "6em",
    margin: "0",
  },
}));

AvailableHoursBtn.propTypes = {
  setHour: PropTypes.func,
  hour: PropTypes.string,
};

export default AvailableHoursBtn;
