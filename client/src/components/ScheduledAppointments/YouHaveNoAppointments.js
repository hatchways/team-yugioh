import React from "react";
import { Typography } from "@material-ui/core";

const YouHaveNoAppointments = ({ upcoming }) => {
  return (
    <Typography variant="body2">
      You do not have any {upcoming ? "upcoming" : "past"} appointments
    </Typography>
  );
};

export default YouHaveNoAppointments;
