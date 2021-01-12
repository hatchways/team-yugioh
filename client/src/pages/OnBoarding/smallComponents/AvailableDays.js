import React from "react";
import { Grid } from "@material-ui/core";

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AvailableDays = (props) => {
  const days = props.days; //useRef object

  return (
    <Grid direction="row" container>
      {week.map((item, i) => {
        return <div></div>;
      })}
    </Grid>
  );
};

export default AvailableDays;
