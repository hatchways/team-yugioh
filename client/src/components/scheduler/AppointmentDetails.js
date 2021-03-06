import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import BackArrow from "../../assets/back.svg";

const AppointmentDetails = ({
  appointmentDetails,
  setAppointmentDetails,
  eventDetails,
  path,
  setAppointmentConfirmed,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const createAppointment = async () => {
    let res;
    try {
      res = await axios.post("/api/appointment", appointmentDetails);
    } catch (err) {
      console.log(err);
    }

    try {
      await axios.post("/api/email", {
        email: appointmentDetails.email,
        eventName: eventDetails.name,
        time: appointmentDetails.time,
        // TODO: get host name
        host: "T Est",
        appointmentId: res.data._id,
        name: appointmentDetails.name,
      });
    } catch (err) {
      console.log(err);
    }

    setAppointmentConfirmed({ id: res.data._id });

    history.push(`${path}/${res.data._id}`);
  };

  return (
    <>
      <Grid direction="row" alignItems="center" container justify="flex-start">
        <Link className={classes.back} to={`${path}`}>
          <Button
            className={classes.backButton}
            onClick={() =>
              setAppointmentDetails({ ...appointmentDetails, time: false })
            }
          >
            Back
          </Button>
        </Link>
        <Typography className={classes.formLabel} variant="h5">
          Enter Details
        </Typography>
      </Grid>
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
            size="small"
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
            size="small"
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

const useStyles = makeStyles((theme) => ({
  root: { height: "100%", overflow: "hidden" },
  button: {
    background: theme.palette.primary.button,
    fontSize: ".8rem",
    color: "white",
    padding: "2% 5%",
    margin: "5% 0 0 17%",
    width: "33%",
  },
  back: {
    background: "white",
    fontSize: ".8rem",
    color: theme.palette.primary.main,
    textDecoration: "none",
    margin: "5% 0",
    padding: "0",
    width: "10%",
    height: "2.3rem",
    border: "1px solid lightgray",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
  },
  backButton: {
    width: "100%",
    height: "100%",
    textIndent: "-9999px",
    backgroundImage: `url(${BackArrow})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "30%",
    minWidth: "0",
  },
  formLabel: {
    margin: "0 6%",
    textAlign: "left",
  },
  inputRow: {
    marginBottom: ".5rem",
  },
}));

AppointmentDetails.propTypes = {
  appointmentDetails: PropTypes.object,
  setAppointmentDetails: PropTypes.func,
  path: PropTypes.string,
};

export default AppointmentDetails;
