import React, { useState, useEffect } from "react";
import { MobileStepper, makeStyles } from "@material-ui/core";

const ProgressBar = (props) => {
  const classes = useStyles();

  const start = props.start || 0;
  const [activeStep, setActiveStep] = useState(start);

  useEffect(() => {
    setActiveStep(start + 1);
  }, [start]);

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

const useStyles = makeStyles(() => ({
  progressBar: {
    margin: "1em",
    padding: 0,
  },
  linearProgress: {
    width: "10em",
  },
}));

export default ProgressBar;
