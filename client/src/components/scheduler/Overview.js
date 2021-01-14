import { Grid } from "@material-ui/core";
import React from "react";

const Overview = () => {
  const classes = useStyles();
  return (
    <Grid item xs={4} className={classes.root}>
      overview
    </Grid>
  );
};

const useStyles = () => ({
  root: { height: "100%" },
});

export default Overview;
