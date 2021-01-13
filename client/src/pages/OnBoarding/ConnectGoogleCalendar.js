import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import ProgressBar from "./smallComponents/ProgressBar";

const ConnectGoogleCalendar = (props) => {
  //styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.entryBig}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Typography>
        <Button className={classes.editButton}>Edit</Button>
      </Grid>

      <Divider />
      <Grid container justify="center" className={classes.buttonGrid}>
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
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonGrid: {
    position: "absolute",
    bottom: "2em",
  },
}));

export default ConnectGoogleCalendar;
