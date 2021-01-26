import React, { useState } from "react";
import {
  Dialog,
  makeStyles,
  Button,
  Typography,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputLabel,
  TextField,
} from "@material-ui/core";

import InviteMembers from "./InviteMembers";
import MembersToBeInvited from "./MembersToBeInvited";

const CreateTeam = ({ open, closeDialog }) => {
  const classes = useStyles();

  const createTeam = (event) => {
    event.preventDefault();
  };

  const [teamName, setTeamName] = useState();
  const handleTeamNameChange = (event) => {
    event.preventDefault();
    setTeamName(event.target.value);
  };

  const [teamDescription, setDescription] = useState();
  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const [teamMembers, setTeamMembers] = useState([]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle variant="h5">Create your team here</DialogTitle>
      <DialogContent>
        <InputLabel>Team name</InputLabel>
        <TextField value={teamName} onChange={handleTeamNameChange} />
        <InputLabel>Team description</InputLabel>
        <TextField value={teamDescription} onChange={handleDescriptionChange} />
        <InputLabel>Invite members with their emails</InputLabel>
        <InviteMembers
          setTeamMembers={setTeamMembers}
          teamMembers={teamMembers}
        />
        <MembersToBeInvited
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={createTeam}>Create your team</Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default CreateTeam;
