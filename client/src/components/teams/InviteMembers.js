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
      <TextField value={email} onChange={handleEmailChange} />
      <Button onClick={addEmailToInvitedList}>Invite</Button>
    </Grid>
  );
};

export default InviteMembers;
