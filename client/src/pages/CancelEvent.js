import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import Overview from "../components/scheduler/Overview";

const CancelEvent = () => {
  const { eventId } = useParams();
  console.log("event ID", eventId);
  return <div>cancel event</div>;
};

export default CancelEvent;
