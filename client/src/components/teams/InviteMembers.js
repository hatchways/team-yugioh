import React, { useState } from "react";

import { Button, Grid, InputLabel, TextField } from "@material-ui/core";

const InviteMembers = ({ setTeamMembers, teamMembers }) => {
  const [email, setEmail] = useState();
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const addEmailToInvitedList = () => {
    setTeamMembers([...teamMembers, email]);
  };
  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <InputLabel>Invite members with their email</InputLabel>
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullwidth
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={addEmailToInvitedList}>Invite</Button>
      </Grid>
    </Grid>
  );
};

export default InviteMembers;
