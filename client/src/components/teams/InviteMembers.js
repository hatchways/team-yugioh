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

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const handleEmailChange = (event) => {
    //validation could probably be done better
    const typedEmail = event.target.value;
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(typedEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmail(typedEmail);
  };

  const addEmailToInvitedList = () => {
    setTeamMembers([...teamMembers, { email }]);
    setEmail("");
    setEmailValid(false);
  };
  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <InputLabel className={classes.label}>Members</InputLabel>
      </Grid>
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          placeholder="Email address"
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={addEmailToInvitedList}
          disabled={!emailValid}
          variant="contained"
          color="primary"
          className={classes.button}
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
  button: {
    marginLeft: "1em",
    color: "white",
  },
}));

export default InviteMembers;