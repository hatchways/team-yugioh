import React from "react";

import { Grid, Typography, TextField } from "@material-ui/core";

const ConnectGoogleCalendar = (props) => {
  return (
    <div>
      <Grid container>
        <Typography>Your Google calendar is connected</Typography>
        <div>Progress bar...</div>
      </Grid>

      <Grid container>
        <Typography>Here is how CalendApp will work with...</Typography>
        <TextField></TextField>
      </Grid>
    </div>
  );
};

export default ConnectGoogleCalendar;
