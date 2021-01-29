import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../assets/happy-cal.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/logo.png";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '4rem',
    flexGrow: 1,
  },
  image: {
    height: "auto",
    maxWidth: "100%",
  },
  imageBox: {
    maxWidth: "40rem",
  },
  title: {
    color: "orange",
    fontWeight: "bold",
  },
  link: {
    fontSize: "1.4rem",
  },
  nav: {
    flexGrow: 1,
    background: "white",
    padding: "1.5rem 3rem",
  },
  logo: {
    flexGrow: 1,
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.nav} position="static" elevation={0}>
        <Toolbar>
          <span className={classes.logo}>
            <img width="110rem" src={Logo} alt="CalendApp logo" />
          </span>
        </Toolbar>
      </AppBar>
      <Grid
        className={classes.root}
        container
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item className={classes.imageBox}>
          <img className={classes.image} alt="404 mascot image" src={Image} />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5">404 Page not found</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h1" className={classes.title}>Whoops...</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {"Lost? The page you're looking for is not here..."}
              </Typography>
            </Grid>

            <Grid item>
              <Button color="secondary" className={classes.link} href="/home">
                <ArrowForwardIcon /> Take me home!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
