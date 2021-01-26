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
  Grid,
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
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle variant="h5">Create your team here</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item container>
            <Grid item xs={5}>
              <InputLabel>Team name</InputLabel>
            </Grid>
            <TextField value={teamName} onChange={handleTeamNameChange} />
          </Grid>

          <Grid item container>
            <Grid item xs={5}>
              <InputLabel>Team description</InputLabel>
            </Grid>
            <TextField
              value={teamDescription}
              onChange={handleDescriptionChange}
            />
          </Grid>

          <Grid item>
            <InviteMembers
              setTeamMembers={setTeamMembers}
              teamMembers={teamMembers}
            />
          </Grid>

          <Grid item container>
            <MembersToBeInvited
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
            />
          </Grid>
        </Grid>
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
