import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { deepOrange } from "@material-ui/core/colors";

export default function EventCard({ name, duration, color, link, url }) {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    colorBar: {
      background: color || deepOrange[500],
      padding: 4,
    },
    button: {
      border: "none",
      backgroundColor: "transparent",
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.colorBar}></CardHeader>

      <CardContent>
        <Typography variant="h5">
          {name || duration + " minute meeting"}
        </Typography>

        <Typography variant="subtitle2" color="textSecondary">
          One-on-One
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2">{duration} min</Typography>
          <a href={"http://localhost:3000/" + url + "/" + link}>
            <Button
              item
              variant="outlined"
              color="secondary"
              size="small"
              style={{ textTransform: "none" }}
            >
              Copy Link
            </Button>
          </a>
        </Grid>
      </CardActions>
    </Card>
  );
}
