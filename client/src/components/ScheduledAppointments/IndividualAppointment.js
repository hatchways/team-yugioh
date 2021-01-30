import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const IndividualAppointment = ({
  appointmentId,
  upcoming,
  attendeeName,
  time,
  duration,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="body1">{time}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{attendeeName}</Typography>
            <Typography variant="body1">Event type {duration}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>Details...</AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default IndividualAppointment;
