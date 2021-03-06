import {
  Typography,
  Grid,
  Button,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";

const MembersToBeInvited = ({ invites, setInvites }) => {
  const classes = useStyles();
  const teamMemberNotEmpty = invites.length !== 0;
  const removeEmailFromInvitedList = (memberToRemove) => () => {
    // Caveat: each email must be unique in the list for this to work
    const filteredList = invites.filter(
      (member) => member.email !== memberToRemove.email
    );
    setInvites(filteredList);
  };
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <InputLabel className={classes.label}>
          An invitation email will be sent to the following members:
        </InputLabel>
      </Grid>
      <Grid item container direction="column" wrap="nowrap">
        {teamMemberNotEmpty &&
          invites.map((member, i) => (
            <Grid item container key={i} alignItems="center" spacing={3}>
              <Grid item xs={1}>
                <Brightness1 color="primary" className={classes.icon} />
              </Grid>
              <Grid item xs={4}>
                <Typography>{member}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={removeEmailFromInvitedList(member)}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: theme.spacing(15),
    marginTop: theme.spacing(5),
  },
  icon: {
    width: theme.spacing(1.4),
    height: theme.spacing(1.4),
  },
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: theme.spacing(1),
  },
}));

MembersToBeInvited.propTypes = {
  setInvites: PropTypes.func,
  invites: PropTypes.array,
};

export default MembersToBeInvited;
