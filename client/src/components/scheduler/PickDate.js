import React from "react";
import { Grid } from "@material-ui/core";

const PickDate = () => {
  const classes = useStyles();
  return (
    <Grid item xs={5} className={classes.root}>
      pick date
    </Grid>
  );
};

const useStyles = () => ({
  root: { height: "100%" },
});

export default PickDate;
