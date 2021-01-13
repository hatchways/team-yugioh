import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"


const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    background: 'linear-gradient(45deg, #e06602 30%, #eda346 90%)',
    padding: theme.spacing(2),
    borderRadius: 29
  }
}));


export default function GetStartedButton() {
const classes = useStyles();

  return (
    <Button className={classes.root}>
     Getting Started Guide
    </Button>
  )
}
