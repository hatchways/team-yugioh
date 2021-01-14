import React from "react";
import { Grid } from "@material-ui/core";

const PickTime = () => {
  const classes = useStyles();
  return (
    <Grid item xs={3} className={classes.root}>
      pick time
    </Grid>
  );
};

const useStyles = () => ({
  root: { height: "100%" },
});

export default PickTime;
