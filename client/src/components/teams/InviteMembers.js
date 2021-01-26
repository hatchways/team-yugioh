import React, { useState } from "react";

import {
  Button,
  Grid,
  InputLabel,
  TextField,
  makeStyles,
} from "@material-ui/core";

const InviteMembers = ({ setTeamMembers, teamMembers }) => {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const handleEmailChange = (event) => {
    event.preventDefault();
    //validation could probably be done better
    const email = event.target.value;
    if (!email) {
      setEmailValid(false);
    }
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailValid(true);
    }
    setEmail(event.target.value);
  };

  const addEmailToInvitedList = () => {
    setTeamMembers([...teamMembers, { email }]);
  };
  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <InputLabel className={classes.label}>
          Invite members with their email
        </InputLabel>
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullwidth
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          required
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={addEmailToInvitedList}
          disabled={!emailValid}
          variant="contained"
          color="primary"
        >
          Invite
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
  },
}));

export default InviteMembers;
