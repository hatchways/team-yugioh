import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  InputLabel,
  TextField,
  makeStyles,
  Chip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const InviteMembers = ({ setInvites, invites, setMembers }) => {
  const classes = useStyles();

  const [queryResults, setQueryResults] = useState([]);
  const [registered, setRegistered] = useState(true);

  const handleEmailChange = (event) => {
    if (event.target.value != "") {
      axios
        .post("/api/user/search", { query: event.target.value })
        .then((res) => {
          if (res.data.length) {
            setRegistered(true);
            setQueryResults(res.data.map((user) => user.email));
          } else {
            setRegistered(false);
            const typedEmail = event.target.value;
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(typedEmail)) {
              setQueryResults([typedEmail]);
            }
          }
        });
    } else {
      setQueryResults([]);
    }
  };

  const handleMemberChange = (event, value) => {
    if (registered) {
      setMembers(value);
    } else {
      setInvites([...invites, value[value.length - 1]]);
      value.pop();
      setRegistered(true);
    }
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <InputLabel className={classes.label}>Members</InputLabel>
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          multiple
          freeSolo
          options={queryResults}
          onChange={handleMemberChange}
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
  setInvites: PropTypes.func,
  invites: PropTypes.array,
};

export default InviteMembers;
