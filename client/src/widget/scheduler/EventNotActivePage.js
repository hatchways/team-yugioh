import Grid from "@material-ui/core/Grid";
import Home from "@material-ui/icons/Home";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Logo from "../assets/logo.png";
import Mascot from "../assets/happy-cal.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5rem",
  },
  image: {
    height: "auto",
    maxWidth: "100%",
    marginTop: theme.spacing(2),
  },
  logo: {
    marginBottom: theme.spacing(2),
    width: 122,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
  container: {
    padding: "1rem",
    maxWidth: "60rem",
  },
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: `100%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
  },
  button: {
    marginTop: 20,
  },
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
}));

export default function EventNotActivePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container className={classes.paperContainer}>
            <Grid item sm={12} md={4} item>
              <img
                className={classes.image}
                src={Mascot}
                alt="CalendApp logo"
              />
            </Grid>

            <img className={classes.logo} src={Logo} alt="CalendApp logo" />
            <Typography className={classes.title} variant="h4">
              This CalendApp URL is not valid.
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
