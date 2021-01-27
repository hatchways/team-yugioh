import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";

const ConfirmAppointment = ({
  appointmentDetails,
  setAppointmentDetails,
  path,
}) => {
  const classes = useStyles();
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const createAppointment = () => {
    axios.post("/api/appointment", appointmentDetails).then((res) => {
      setAppointmentDetails({
        eventId: "",
        name: "",
        email: "",
        notes: "",
        time: false,
        timezone: "UTC",
      });
    });
  };
  return (
    <>
      <Link to={`${path}`}>
        <Button
          onClick={() =>
            setAppointmentDetails({ ...appointmentDetails, time: false })
          }
        >
          Back
        </Button>
      </Link>
      <Grid
        direction="row"
        alignItems="center"
        container
        justify="flex-start"
        className={classes.inputRow}
      >
        <Grid xs={2} item>
          <InputLabel className={classes.label}>Name</InputLabel>
        </Grid>

        <Grid xs={10} item>
          <TextField
            variant="outlined"
            margin="normal"
            name="name"
            type="text"
            onChange={handleFormChange}
            fullWidth
            value={appointmentDetails.name}
          />
        </Grid>
      </Grid>
      <Grid
        direction="row"
        alignItems="center"
        container
        justify="flex-start"
        className={classes.inputRow}
      >
        <Grid xs={2} item>
          <InputLabel className={classes.label}>Email</InputLabel>
        </Grid>

        <Grid xs={10} item>
          <TextField
            variant="outlined"
            margin="normal"
            name="email"
            type="text"
            onChange={handleFormChange}
            fullWidth
            value={appointmentDetails.email}
          />
        </Grid>
      </Grid>
      <Grid
        direction="row"
        alignItems="center"
        container
        justify="flex-start"
        className={classes.inputRow}
      >
        <Grid xs={2} item>
          <InputLabel className={classes.descriptionLabel}>Notes</InputLabel>
        </Grid>

        <Grid xs={10} item>
          <TextField
            variant="outlined"
            margin="normal"
            name="notes"
            multiline
            onChange={handleFormChange}
            fullWidth
            value={appointmentDetails.notes}
            placeholder={`Write any details that will help prepare for our meeting.
                                    
                                    
                                    `}
            className={classes.textArea}
          />
        </Grid>
      </Grid>

      <Button
        color="primary"
        className={classes.button}
        onClick={createAppointment}
      >
        Schedule Event
      </Button>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: { height: "100%", overflow: "hidden" },
}));

ConfirmAppointment.propTypes = {
  appointmentDetails: PropTypes.object,
  setAppointmentDetails: PropTypes.func,
};

export default ConfirmAppointment;
