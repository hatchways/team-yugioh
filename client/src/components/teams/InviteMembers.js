import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  makeStyles,
  Chip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const InviteMembers = ({ setTeamMembers, teamMembers }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [emailValid, setEmailValid] = useState(false);

  const handleEmailChange = (event) => {
    //validation could probably be done better
    axios.get("/api/user/search", { query: event.target.value }).then((res) => {
      if (res.data.length) {
        setQueryResults(res.data);
      } else {
        const typedEmail = event.target.value;
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(typedEmail)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
        setQueryResults(["Invite " + typedEmail + "?"]);
      }
    });
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
      {/* <Grid item xs={8}>
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
      </Grid> */}
      <Grid item xs={10}>
        <Autocomplete
          multiple
          options={queryResults}
          freeSolo
          open={!!email}
          onInputChange={handleEmailChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField variant="outlined" {...params} placeholder="Email" />
          )}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
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

InviteMembers.propTypes = {
  setTeamMembers: PropTypes.func,
  teamMembers: PropTypes.array,
};

export default InviteMembers;
