import React from "react";
import {
  Dialog,
  makeStyles,
  Button,
  Typography,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const CreateTeam = ({ open, closeDialog }) => {
  const classes = useStyles();

  const createTeam = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle variant="h5">Create your team here</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={createTeam}>Create your team</Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default CreateTeam;
