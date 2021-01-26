import React, { useState } from "react";

import { Button, Grid, InputLabel, TextField } from "@material-ui/core";

const InviteMembers = ({ setTeamMembers }) => {
  return (
    <Grid container>
      <TextField />
      <Button>Invite</Button>
    </Grid>
  );
};

export default InviteMembers;
