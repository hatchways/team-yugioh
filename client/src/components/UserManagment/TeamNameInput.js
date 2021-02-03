import React, {useState} from "react";
import { makeStyles, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  buttonCheck: {
    color: "green",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  buttonClose: {
    color: "red",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "white"
    }
  }
});

export default function TeamNameInput({
  handleSubmit,
  toggleNameChange,
  teamName
}) {
  const classes = useStyles();
  const [inputValue, changeInput]=useState(teamName);

  const handleChange = event => {
    changeInput(event.target.value);
  };

  const handleClear=()=>{
    //setTitle(previousName);
    toggleNameChange();

  }

  return (
    <div className={classes.root}>
      <TextField
        id="standard-multiline-flexible"
        multiline
        rowsMax={4}
        value={inputValue}
        onChange={handleChange}
      />
      <div className={classes.buttonContainer}>
        <IconButton
          color="primary"
          aria-label="accept"
          component="span"
          onClick={()=>handleSubmit(inputValue)}
          classes={{ root: classes.buttonCheck }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="decline"
          component="span"
          onClick={handleClear}
          classes={{ root: classes.buttonClose }}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
