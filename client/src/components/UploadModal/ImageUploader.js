import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { orange } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: orange[100],
    color: orange[600],
    width: theme.spacing(22),
    height: theme.spacing(22),
    margin: '2rem 5rem'
  }
}));

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
    className={classes.root}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Profile photo</DialogTitle>
      <Avatar className={classes.avatar} />
      <Box display="flex" justifyContent="space-between" style={{padding: 25}}>
      <Button variant='outline' color="primary" component='label'>
        Save Changes
      </Button>
      <Button variant='contained'color="primary" component='label'>
      + Upload File
        <input type='file' hidden />
      </Button>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

