import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  Calendar,
  useStaticState,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const PickDate = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DisplayCalendar />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

const DisplayCalendar = () => {
  const [date, setDate] = useState(new Date());
  const { pickerProps } = useStaticState({
    value: date,
    onChange: setDate,
  });
  return <Calendar {...pickerProps} />;
};

const useStyles = makeStyles(() => ({
  root: { height: "100%", overflow: "hidden" },
}));

export default PickDate;
