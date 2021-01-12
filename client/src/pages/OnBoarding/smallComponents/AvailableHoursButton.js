import React, { useState, useEffect } from "react";
import { TextField, MenuItem, makeStyles, Menu } from "@material-ui/core";

const timeSlots = [];
for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 60; j = j + 15) {
    const hour = i < 10 ? "0" + i.toString() : i.toString();
    const min = j < 10 ? "0" + j.toString() : j.toString();
    timeSlots.push(hour + min);
  }
}

const AvailableHoursBtn = (props) => {
  const hour = props.hour; //useRef object
  const [hourLocal, setHour] = useState("");

  const classes = useStyles();

  const selectHour = (event) => {
    setHour(event.target.value);
  };

  useEffect(() => {
    hour.current = hourLocal;
  }, [hour, hourLocal]);

  return (
    <TextField
      select
      value={hourLocal}
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

const useStyles = makeStyles((theme) => ({
  menu: {
    width: "6em",
    margin: "0 1em",
  },
}));

export default AvailableHoursBtn;
