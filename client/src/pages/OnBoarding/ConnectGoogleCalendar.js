import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const ConnectGoogleCalendar = () => {
  //styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.entryBig} variant="subtitle1">
        Here is how CalendApp will work with john-doe@gmail.com
      </Typography>

      <Divider />

      <Grid
        container
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
        className={classes.entrySmall}
      >
        <Typography>
          1. We will check <b>john-doe@gmail.com</b> for conflicts
        </Typography>
        <Button className={classes.editButton}>Edit</Button>
      </Grid>

      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.entrySmall}
        spacing={0}
      >
        <Typography>
          2. We will add event to <b>john-doe@gmail.com</b>
        </Typography>
        <Button className={classes.editButton}>Edit</Button>
      </Grid>

      <Divider />
      <Grid container justify="center">
        <Button
          className={classes.continueButton}
          color="primary"
          variant="contained"
        >
          <Link to="/onboarding/3" className={classes.link}>
            Continue
          </Link>
        </Button>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "20em",
  },
  entrySmall: {
    padding: "0.4em 2em",
    width: "100%",
  },
  entryBig: {
    padding: "1.5em 2em",
  },
  editButton: {
    margin: "0",
    color: theme.palette.text.secondary,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  continueButton: {
    position: "absolute",
    bottom: "2em",
    width: "3em",
    background: theme.palette.primary.button,
    color: "white",
    padding: "15px 50px 15px 50px",
  },
}));

export default ConnectGoogleCalendar;
