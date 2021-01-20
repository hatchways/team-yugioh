import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    background: 'linear-gradient(45deg, #e06602 30%, #eda346 90%)',
    padding: "1rem 2rem",
    borderRadius: 29,
    textTransform: 'none',  
  },
  text : {
    fontWeight: 500
  }
}));


export default function GetStartedButton() {
const classes = useStyles();

  return (
    <Button className={classes.root}>
     <Typography className={classes.text}variant="subtitle1">Getting Started Guide</Typography>
    </Button>
  )
}
