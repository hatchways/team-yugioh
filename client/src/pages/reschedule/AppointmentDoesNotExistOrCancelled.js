import React from "react";
import { Paper, makeStyles, Grid } from "@material-ui/core";

const AppointmentDoesNotExistOrCancelled = (props) => {
  const appointmentCancelled = props.variant === "cancelled";
  const appointmentDoesNotExist = props.variant === "doesNotExist";

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <div className={classes.gridContainer}>
        <Grid container direction="column">
          <Typography variant="h5">
            {appointmentCancelled && "The appointment has been cancelled"}
            {appointmentDoesNotExist && "The appointment does not exist"}
          </Typography>
        </Grid>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(60),
    width: theme.spacing(100),
    margin: `${theme.spacing(10)}px auto`,
  },
  gridContainer: {
    padding: "3em",
  },
}));

export default AppointmentDoesNotExistOrCancelled;
