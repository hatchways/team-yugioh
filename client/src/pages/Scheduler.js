import React from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";

const data = () => {
  // Since I'm not sure how the data will be fetched or in what format,
  // I will use this for now to provide the component with data
};

const Scheduler = () => {
  const classes = useStyles();
  return (
    <Paper>
      <Grid>
        <p>hello</p>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    height: "30em",
  },
}));

export default Scheduler;
