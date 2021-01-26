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
          <Grid item container alignItems="center">
            <Grid item xs={5}>
              <InputLabel className={classes.label}>Team name</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={teamName}
                onChange={handleTeamNameChange}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center">
            <Grid item xs={5}>
              <InputLabel className={classes.label}>
                Team description
              </InputLabel>
            </Grid>
            <Grid item xs={7}>
              <TextField
                value={teamDescription}
                onChange={handleDescriptionChange}
                variant="outlined"
                multiline
                margin="normal"
                fullWidth
                InputProps={{ className: classes.descriptionInput }}
              />
            </Grid>
          </Grid>

          <Grid item>
            <InviteMembers
              setTeamMembers={setTeamMembers}
              teamMembers={teamMembers}
            />
          </Grid>

          <Grid item>
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

const useStyles = makeStyles((theme) => ({
  descriptionInput: {
    height: theme.spacing(20),
  },
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
  },
}));

export default CreateTeam;