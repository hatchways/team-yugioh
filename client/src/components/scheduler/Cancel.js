import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

const Cancel = () => {
  const classes = useStyles();
  return (
    <div className={classes.gridContainer}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h5">Cancel Event?</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Reason for canceling"
            multiline
            rows={7}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button className={classes.button}>Confirm cancellation</Button>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "2em",
  },
  button: {
    background: theme.palette.primary.button,
    color: "white",
  },
}));
export default Cancel;
