import React, { useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";

import SetTimezoneUrl from "./SetTimezoneUrl";
import ConnectGoogleCalendar from "./ConnectGoogleCalendar";
import SetAvailability from "./SetAvailability";

const OnBoarding = (props) => {
  const [pageNum, setPageNum] = useState(0);

  const Page =
    pageNum === 0
      ? SetTimezoneUrl
      : pageNum === 1
      ? ConnectGoogleCalendar
      : SetAvailability;

  const FlipToNextPage = () => {
    setPageNum(Math.min(2, pageNum + 1));
  };

  return (
    <Paper>
      <Page />
      {pageNum !== 2 && <Button onClick={FlipToNextPage}>Continue</Button>}
      {pageNum === 2 && <Button>Finish</Button>}
    </Paper>
  );
};

export default OnBoarding;
