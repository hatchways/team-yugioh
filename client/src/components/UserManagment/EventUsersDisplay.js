import React from "react";
import {
  TextField,
  makeStyles,
  Chip
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container:{
        display:"flex",
        flexDirection:"row"
    }
}));

const EventUsersDisplay = () => {
    const classes=useStyles();
    
  return (
    <div className={classes.container}>
        <div className={classes.badgeContainer}>
        <Chip
              label="hello"
        />
        </div>
        <TextField variant="outlined" />
    </div>
  );
};

export default EventUsersDisplay;
