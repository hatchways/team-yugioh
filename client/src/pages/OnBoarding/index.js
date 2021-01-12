import React, { useState, useRef } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";

import SetTimezoneUrl from "./SetTimezoneUrl";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import SetAvailability from "./SetAvailability";

const OnBoarding = (props) => {
  const [pageNum, setPageNum] = useState(0);
  const url = useRef();
  const timezone = useRef();
  const days = useRef();
  const hours = useRef();

  const FlipToNextPage = () => {
    //send data to backend here

    if (pageNum === 2) {
      //redirect to somewhere
    } else {
      setPageNum(Math.min(2, pageNum + 1));
    }
  };

  return (
    <Paper>
      {pageNum === 0 && <SetTimezoneUrl url={url} timezone={timezone} />}
      {pageNum === 1 && <ConnectGoogleCalendar />}
      {pageNum === 2 && <SetAvailability days={days} hours={hours} />}
      <Button onClick={FlipToNextPage}>
        {pageNum === 2 ? "Finish" : "Continue"}
      </Button>
    </Paper>
  );
};

export default OnBoarding;
