import React, { useState, useEffect } from "react";
import { MobileStepper, Button } from "@material-ui/core";

import useStyles from "./useStylesHook";

const ProgressBar = (props) => {
  const classes = useStyles();

  const start = props.start || 0;
  const end = props.end;
  const [activeStep, setActiveStep] = useState(start);

  useEffect(() => {
    setTimeout(() => {
      setActiveStep(start + 1);
    }, 100);
  }, [start, end]);

  return (
    <MobileStepper
      className={classes.progressBar}
      variant="progress"
      steps={5}
      position="static"
      activeStep={activeStep}
      LinearProgressProps={{
        className: classes.linearProgress,
      }}
    ></MobileStepper>
  );
};

export default ProgressBar;
