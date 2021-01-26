import {
  TextField,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";
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
    <Grid
      container
      className={classes.root}
      direction="column"
      wrap="nowrap"
      spacing={3}
    >
      {teamMemberNotEmpty &&
        teamMembers.map((member, index) => (
          <Grid item container key={index} alignItems="center">
            <Grid item xs={2}>
              <Brightness1 color="primary" className={classes.icon} />
            </Grid>
            <Grid item xs={8}>
              <Typography>{member.email}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button onClick={removeEmailFromInvitedList(member)}>
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  icon: {
    width: theme.spacing(1.4),
    height: theme.spacing(1.4),
  },
}));

export default MembersToBeInvited;
