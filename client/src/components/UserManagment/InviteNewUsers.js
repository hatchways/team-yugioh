import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, InputLabel, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MembersToBeInvited from "../teams/MembersToBeInvited";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "10% 0",
    width: "496px",
    border: "solid 2px black",
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
  container:{
      maxWidth:480,
      padding:20
  },
  cancellButton:{
    padding:"10px 50px",
    margin:"30px 10px",
    fontSize:16

},
continueButton:{
    padding:"10px 50px",
    margin:"30px 10px",
    fontSize:16,
    color:"white"
},
outerContainer:{
    padding:"0 5%"
}
});

function Modal(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, userName } = props;

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [membersToInvite, setMembersToInvite] = useState([]);
  const handleEmailChange = event => {
    //validation could probably be done better
    const typedEmail = event.target.value;
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(typedEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmail(typedEmail);
  };

  const addEmailToInvitedList = () => {
    setMembersToInvite([...membersToInvite, { email }]);
    setEmail("");
    setEmailValid(false);
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

        <Grid container alignItems="center" className={classes.label}>
          <Grid item xs={2}>
            <InputLabel>Members</InputLabel>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              className={classes.inputField}
              placeholder="Email address"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={addEmailToInvitedList}
              disabled={!emailValid}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <div className={classes.container}>
          <MembersToBeInvited
            teamMembers={membersToInvite}
            setTeamMembers={setMembersToInvite}
          />
        </div>
        <div>
            <Button variant="contained" color="primary" className={classes.continueButton} onClick={handleSubmit}>Send</Button>
            <Button variant="outlined" color="primary" className={classes.cancellButton} onClick={handleClose}>Cancel</Button>
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
