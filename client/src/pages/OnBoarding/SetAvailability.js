import React from "react";

import { Grid, Typography, TextField } from "@material-ui/core";

const SetAvailability = (props) => {
  //two useRef objects below
  const hours = props.hours;
  const days = props.days;

  return (
    <div>
      <Grid container>
        <Typography>Set your availability</Typography>
        <div>Progress bar...</div>
      </Grid>

      <Grid container>
        <Typography>Available hours</Typography>
        <TextField></TextField>
      </Grid>

      <Grid container>
        <Typography>Select your time zone</Typography>
        <TextField></TextField>
      </Grid>
    </div>
  );
};

export default SetAvailability;
