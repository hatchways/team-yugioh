import React from "react";

import { Grid, Typography, TextField } from "@material-ui/core";

const SetTimezoneUrl = (props) => {
  return (
    <div>
      <Grid container>
        <Typography>Welcome to CalendApp!</Typography>
        <div>Progress bar...</div>
      </Grid>

      <Grid container>
        <Typography>Create your CalendApp URL:</Typography>
        <TextField></TextField>
      </Grid>

      <Grid container>
        <Typography>Select your time zone</Typography>
        <TextField></TextField>
      </Grid>
    </div>
  );
};

export default SetTimezoneUrl;
