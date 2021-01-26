import { TextField, Typography, Grid, Button } from "@material-ui/core";
import React from "react";

const MembersToBeInvited = ({ teamMembers, setTeamMembers }) => {
  const teamMemberNotEmpty = teamMembers.length !== 0;
  const removeEmailFromInvitedList = (email) => () => {
    // Caveat: each email must be unique in the list for this to work
    const filteredList = teamMembers.filter((member) => member !== email);
    setTeamMembers(filteredList);
  };
  return (
    teamMemberNotEmpty && (
      <div>
        {teamMembers.map((member, index) => (
          <Grid container key={index}>
            <Typography>{member}</Typography>
            <Button onClick={removeEmailFromInvitedList(member)}>Remove</Button>
          </Grid>
        ))}
      </div>
    )
  );
};

export default MembersToBeInvited;
