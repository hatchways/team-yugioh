import React, { useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import PickDate from "./PickDate";
import PickTime from "./PickTime";

const SelectAnOpeningSlot = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());
  //this will be fetched from the server
  const availTimes = { start: "09:00", end: "17:00" };
  const availDates = [1, 2, 3, 4, 5];
  //this will be set when picking event type --> pulled from context?
  const interval = "60";
  return (
    <div className={classes.gridContainer}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5" className={classes.title}>
            Select a Date {"&"} Time
          </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={7}>
            <PickDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              availability={availDates}
            />
          </Grid>
          <Grid item xs={5}>
            <PickTime />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "2em",
  },
}));

export default SelectAnOpeningSlot;
