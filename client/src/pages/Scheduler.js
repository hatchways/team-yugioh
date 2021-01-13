import React from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";

const data = () => {
  // Since I'm not sure how the data will be fetched or in what format,
  // I will use this for now to provide the component with data
};

const Scheduler = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <Grid>
        <p>hello</p>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    height: "20em",
    width: "40em",
    margin: "3em auto",
  },
}));

export default Scheduler;
