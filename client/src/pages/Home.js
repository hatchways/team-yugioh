import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SelectTabs from "../components/SelectTabs/SelectTabs";
import NavBar from "./../components/Header/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(10),
    fontWeight: 500,
  },
  getStartedButton: {
    marginRight: theme.spacing(10),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <Typography className={classes.title} variant="h5">
        My CalendApp
      </Typography>

      <SelectTabs />
    </div>
  );
}
