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
    <Grid container>
      <Grid item xs={5}>
        <InputLabel>Invite members with their email</InputLabel>
      </Grid>
      <Grid item xs={5}>
        <TextField value={email} onChange={handleEmailChange} />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={addEmailToInvitedList}>Invite</Button>
      </Grid>
    </Grid>
  );
};

export default InviteMembers;
