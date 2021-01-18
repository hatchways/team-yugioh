import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavBar from "../components/Header/NavBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inherit",
    flexGrow: 1
  },
  main:{
    display:"flex",
    justifyContent:"center"
  },
  heading: {
    textAlign: "center"
  },
  title: {
    marginTop: theme.spacing(6),
    fontWeight: 600,
    marginBottom: theme.spacing(2)
  },
  subtitle: {
    fontSize: 16,
  }
}));

export default function UpgradePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.main}>
        <div className={classes.heading}>
          <Typography className={classes.title} variant="h4">
            Upgrade your account
          </Typography>
          <Typography className={classes.subtitle} variant="body4">
            You are on a free basic plan
          </Typography>
        </div>
      </main>
    </div>
  );
}
