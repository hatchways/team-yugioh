import React from "react";
import { TextField, MenuItem, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { format, parse } from "date-fns";

const timeSlots = [];
for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? "0" + i.toString() : i.toString();
  timeSlots.push(hour + ":00");
}

const AvailableHoursBtn = (props) => {
  const currentDate = new Date();
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
      {timeSlots.map((time) => {
        const parsedTime = parse(time, "HH:mm", currentDate);
        const formattedTime = format(parsedTime, "h:mm b");
        return (
          <MenuItem key={time} value={time}>
            {formattedTime}
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
