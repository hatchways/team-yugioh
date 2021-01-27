import React from "react";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Divider,
  Button,
  Container
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function UserActionsButton() {
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<FontAwesomeIcon icon={faCoffee} />}
    >
      Delete
    </Button>
  );
}
