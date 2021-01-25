import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavBar from "../components/Header/NavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import UpgradeCard from "../components/upgradeCard/UpgradeCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inherit",
    flexGrow: 1,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(6),
  },
  heading: {
    textAlign: "center",
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: 16,
    color: "#909090",
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

const UpgradePage = () => {
  const classes = useStyles();
  const plan = "free basic";
  const basicPlanFeatures = ["Unlimited event types", "Group meetings"];
  const premiumPlanFeatures = [
    "Unlimited event types",
    "Group meetings",
    "24/7 Support",
  ];

  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    axios.get("/api/subscription/check").then((res) => {
      setSubscribed(res.data.subscribed);
      console.log("subscribed?", res.data.subscribed);
    });
  });

  return (
    <div>
      <NavBar />

      <Container maxWidth="sm" className={classes.main}>
        <div className={classes.heading}>
          <Typography className={classes.title} variant="h4">
            Upgrade your account
          </Typography>
          <Typography className={classes.subtitle}>
            You are on a {plan} plan
          </Typography>
        </div>
        <Grid container spacing={6} className={classes.cardContainer}>
          <Grid item xs={12} sm={6}>
            <UpgradeCard
              title="Basic"
              price="Free"
              titleColor="color1"
              selected={!subscribed}
              featuresList={basicPlanFeatures}
              setSubscribed={setSubscribed}
              subscribed={subscribed}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UpgradeCard
              title="Premium"
              price="$8/month"
              titleColor="color2"
              selected={subscribed}
              featuresList={premiumPlanFeatures}
              setSubscribed={setSubscribed}
              subscribed={subscribed}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UpgradePage;
