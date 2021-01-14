import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const PickDate = () => {
  const classes = useStyles();

  const [date, setDate] = useState(new Date());

  return (
    <Grid className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker variant="static" value={date} onChange={setDate} />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: { height: "100%", overflow: "hidden" },
}));

export default PickDate;
