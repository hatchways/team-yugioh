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
import axios from "axios";

const CreateTeam = ({ open, closeDialog }) => {
  const classes = useStyles();

  const createTeam = () => {
    axios
      .post("/api/team/create", { name: teamName, members: members })
      .then((res) => {closeDialog()})
      .catch((err) => console.log(err));
  };

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const [invites, setInvites] = useState([]);

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

            <Grid item>
              <InviteMembers
                setInvites={setInvites}
                invites={invites}
                members={members}
                setMembers={setMembers}
              />
            </Grid>

            <Grid item>
              <MembersToBeInvited invites={invites} setInvites={setInvites} />
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
