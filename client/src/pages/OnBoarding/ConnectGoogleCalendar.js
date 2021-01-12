import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";

import ProgressBar from "./smallComponents/ProgressBar";

const ConnectGoogleCalendar = (props) => {
  //styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        item
        wrap="nowrap"
        alignItems="flex-start"
        justify="space-between"
        className={classes.topContent}
      >
        <Typography variant="h6">Your Google calendar is connected!</Typography>
        <ProgressBar start={1} end={2} />
      </Grid>
      <Divider />

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
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  topContent: {
    padding: "2em",
    height: "6em",
  },
  root: {
    flexGrow: 1,
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
}));

export default ConnectGoogleCalendar;
