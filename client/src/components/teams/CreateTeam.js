import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  makeStyles,
  Button,
  DialogContent,
  Typography,
  DialogActions,
  InputLabel,
  TextField,
  Grid,
} from "@material-ui/core";

import InviteMembers from "./InviteMembers";
import MembersToBeInvited from "./MembersToBeInvited";

const CreateTeam = ({ open, closeDialog }) => {
  const classes = useStyles();

  const createTeam = () => {};

  const [teamName, setTeamName] = useState("");
  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const [teamDescription, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [teamMembers, setTeamMembers] = useState([]);
  // Data structure: teamMembers = [{name: <name>, email: <email>}, {}]

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      className={classes.root}
      fullWidth
    >
      <div className={classes.dialogPadding}>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">Create your team here</Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item xs={2}>
                <InputLabel className={classes.label}>Name</InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={teamName}
                  onChange={handleTeamNameChange}
                />
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item xs={2}>
                <InputLabel className={classes.descriptionLabel}>
                  Description
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  value={teamDescription}
                  onChange={handleDescriptionChange}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="normal"
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
          <Button onClick={closeDialog} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button onClick={createTeam} className={classes.createButton}>
            Create your team
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "47em",
    marginTop: "6em",
  },
  dialogPadding: {
    paddingTop: "1em",
    paddingLeft: "2em",
    paddingRight: "2em",
    paddingBottom: "1em",
  },
  label: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
  },
  descriptionLabel: {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "rgba(0, 0, 0, 0.8)",
    marginTop: theme.spacing(3),
  },
  createButton: {
    background: theme.palette.primary.button,
    fontSize: ".8rem",
    color: "white",
    padding: "2% 5%",
  },
  cancelButton: {
    color: "#9e9e9e",
  },
}));

CreateTeam.propTypes = {
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
};

export default CreateTeam;
