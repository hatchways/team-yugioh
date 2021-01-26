import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";

const PickDate = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DisplayCalendar {...props} />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

const DisplayCalendar = ({ selectedDate, setSelectedDate }) => {
  const disableDate = (date) => {
    //check against the availability to determine which dates to grey out
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }
  };
  return (
    <Calendar
      date={selectedDate}
      onChange={setSelectedDate}
      shouldDisableDate={disableDate}
    />
  );
};

const useStyles = makeStyles(() => ({
  root: { height: "100%", overflow: "hidden" },
}));

DisplayCalendar.propTypes = {
  selectedDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
};

export default PickDate;
