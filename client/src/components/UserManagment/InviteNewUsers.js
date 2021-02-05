import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, InputLabel, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MembersToBeInvited from "../teams/MembersToBeInvited";
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "10% 0",
    width: "496px",
    border: "solid 2px black"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "5%",
    color: "#4d5055"
  },
  subtitle: {
    color: "#4d5055",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "5%"
  },
  mainText: {
    padding: "5% 10% 5% 10%",
    fontSize: 14,
    color: "#4d5055"
  },
  popoverButton: {
    borderRadius: 0,
    borderBottom: "none"
  },
  cancellButton: {
    padding: "8px 35px",
    margin: "30px 10px",
    fontSize: 16
  },
  continueButton: {
    padding: "8px 40px",
    margin: "30px 10px",
    fontSize: 16,
    color: "white"
  },
  selectDropdown: {
    margin: "8px",
    minWidth: 120,
    fontSize: 16
  },
  newUbutton: {
    padding: "9px 16px",
    fontSize: 16,
    fontWeight: "normal"
  },
  label: {
    marginTop: 40
  },
  container: {
    maxWidth: 480,
    padding: 20
  },
  cancellButton: {
    padding: "10px 50px",
    margin: "30px 10px",
    fontSize: 16
  },
  continueButton: {
    padding: "10px 50px",
    margin: "30px 10px",
    fontSize: 16,
    color: "white"
  },
  outerContainer: {
    padding: "0 5%"
  },
  body: {
    marginBottom: "10%"
  },
  buttonContainer: {
    marginTop: "10%"
  }
});

function Modal(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  //TODO: add email validation

  const [invitees, setInvitees] = React.useState([]);

  const handleDeleteChip = chipToDelete => {
    setInvitees(invitees.filter(chip => chip !== chipToDelete));
  };

  const handleAddChip = chipToAdd => {
    setInvitees([...invitees, chipToAdd]);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = () => {
    //api call here
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="xl"
    >
      <div className={classes.root}>
        <div className={classes.outerContainer}>
          <Typography variant="h1" className={classes.title}>
            Invite Users to Join Your Team
          </Typography>
          <Typography variant="body1" className={classes.body}>
            Enter email addresses for the new users below and they'll receive
            invitations to join your team!
          </Typography>

          <ChipInput
            value={invitees}
            onAdd={chip => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            variant="outlined"
            fullWidth
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.continueButton}
              onClick={handleSubmit}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.cancellButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function InviteNewUsers({ userName }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        className={classes.newUbutton}
        onClick={handleClickOpen}
        color="primary"
      >
        New User
      </Button>
      <Modal open={open} onClose={handleClose} userName={userName} />
    </div>
  );
}
