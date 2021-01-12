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
    <div className={classes.pageTwoRoot}>
      <Grid
        container
        item
        wrap="nowrap"
        alignItems="start"
        justify="space-between"
        className={classes.topContent}
      >
        <Typography variant="h6">Your Google calendar is connected!</Typography>
        <ProgressBar start={1} end={2} />
      </Grid>
      <Divider />

      <Typography className={classes.pageOneEntry}>
        Here is how CalendApp will work with john-doe@gmail.com
      </Typography>

      <Divider />

      <Grid
        container
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
        className={classes.pageTwoEntry}
      >
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Typography>
        <Button>Edit</Button>
      </Grid>

      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.pageTwoEntry}
        spacing={0}
      >
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Typography>
        <Button>Edit</Button>
      </Grid>

      <Divider />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  pageTwoRoot: {
    flexGrow: 1,
  },
  topContent: {
    padding: "2em",
    height: "6em",
  },
  pageTwoRoot: {
    flexGrow: 1,
  },
  pageTwoEntry: {
    margin: "0.4em 2em",
  },
  pageOneEntry: {
    margin: "1.5em 2em",
  },
}));

export default ConnectGoogleCalendar;
