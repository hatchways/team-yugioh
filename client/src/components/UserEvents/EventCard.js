import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { DoneOutlined } from "@material-ui/icons";
import { deepOrange } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function EventCard({ name, duration, color, link }) {
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
      textTransform: "none",
      height: 32,
      width: 80,
    },
  });
  const classes = useStyles();

  const invitationLink = "http://localhost:3000/appt/" + link; // needs improvement
  const [copied, setCopied] = useState(false);
  const whenCopiedToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      // such that the copied state doesn't linger forever
      setCopied(false);
    }, 3000);
  };

  return (
    <>
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
            <CopyToClipboard
              text={invitationLink}
              onCopy={whenCopiedToClipboard}
            >
              <Button
                variant={copied ? "contained" : "outlined"}
                color="secondary"
                size="small"
                className={classes.button}
              >
                {copied ? <DoneOutlined /> : "Copy link"}
              </Button>
            </CopyToClipboard>
          </Grid>
        </CardActions>
      </Card>
      <Snackbar
        open={copied}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message="Invitation link copied to clipboard"
      />
    </>
  );
}

EventCard.PropTypes = {
  name: PropTypes.string,
  duration: PropTypes.number,
  color: PropTypes.string,
  link: PropTypes.string,
};
