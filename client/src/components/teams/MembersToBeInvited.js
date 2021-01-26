import {
  TextField,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const MembersToBeInvited = ({ teamMembers, setTeamMembers }) => {
  const classes = useStyles();
  const teamMemberNotEmpty = teamMembers.length !== 0;
  const removeEmailFromInvitedList = (memberToRemove) => () => {
    // Caveat: each email must be unique in the list for this to work
    const filteredList = teamMembers.filter(
      (member) => member.email !== memberToRemove.email
    );
    setTeamMembers(filteredList);
  };
  return (
    <div className={classes.root}>
      {teamMemberNotEmpty &&
        teamMembers.map((member, index) => (
          <Grid container key={index}>
            <Typography>{member.email}</Typography>
            <Button onClick={removeEmailFromInvitedList(member)}>Remove</Button>
          </Grid>
        ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(20),
  },
}));

export default MembersToBeInvited;
