import { Grid, makeStyles, Typography } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";

const Overview = ({ name, duration, description }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} spacing={1} container direction="column">
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary">
          {name}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="h6">
          {`${name}` || `${duration} minute meeting`}
        </Typography>
      </Grid>
      <Grid container item alignItems="center" className={classes.iconWrapper}>
        <AccessTime />
        <Typography variant="caption">{duration} minute</Typography>
      </Grid>
      <Grid item>
        <Typography variant="p">{description}</Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: theme.spacing(3),
  },
  iconWrapper: {
    padding: 0,
  },
}));

Overview.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Overview;
