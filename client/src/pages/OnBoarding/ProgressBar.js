import React, { useState, useEffect } from "react";
import { MobileStepper, Button, makeStyles } from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  progressBar: {
    width: "11em",
    margin: "1em",
    padding: 0,
  },
  linearProgress: {
    width: "100%",
  },
}));

export default ProgressBar;
