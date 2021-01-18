import React from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection:"column",
      padding:"10%",
      width:300,
      backgroundColor:"grey",
      textAlign:"center",
      margin:"auto"
    },
  }));

const UpgradeCard=(title, titleColor, feturesList)=>{

    const classes=useStyles();

    return (
        <Paper className={classes.root}>
            Hello
        </Paper>
    )
}

export default UpgradeCard;