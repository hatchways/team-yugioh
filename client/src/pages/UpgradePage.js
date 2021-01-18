import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavBar from "../components/Header/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import UpgradeCard from "../components/UpgradeCard";

const useStyles = makeStyles(theme => ({
  root: {
    display: "inherit",
    flexGrow: 1
  },
  main: {
    display: "flex",
    flexDirection:"column",
    marginTop: theme.spacing(6)
  },
  heading: {
    textAlign: "center"
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(2)
  },
  subtitle: {
    fontSize: 16,
    color: "#909090"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row"
  }
}));

const UpgradePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />

      <Container maxWidth="lg" className={classes.main}>
        <div className={classes.heading}>
          <Typography className={classes.title} variant="h4">
            Upgrade your account
          </Typography>
          <Typography className={classes.subtitle} variant="body4">
            You are on a free basic plan
          </Typography>
        </div>
        <Grid container spacing={6} className={classes.cardContainer}>
          <Grid item lg={6}>
            <UpgradeCard />
          </Grid>
          <Grid item lg={6}>
            <UpgradeCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UpgradePage;
