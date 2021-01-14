import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";

const PickTime = (props) => {
  const classes = useStyles();
  const timeSlots = [
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];
  const date = props.date || "January 14, 2020, Thursday";

  return (
    <Grid item xs={3} className={classes.root}>
      <Grid item>
        <Typography variant="h6">{date}</Typography>
      </Grid>

      <Grid item className={classes.list}>
        {timeSlots.map((slot, i) => (
          <ListItem key={i} className={classes.listItem} button>
            <Grid container direction="row" justify="space-around">
              <Brightness1 color="primary" fontSize="small" />
              <Typography>{slot}</Typography>
            </Grid>
          </ListItem>
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: theme.spacing(2),
  },
  list: {
    overflow: "auto",
    height: "80%",
    padding: theme.spacing(1),
  },
  icon: {
    width: "3px",
    overflow: "hidden",
  },
  listItem: {
    borderColor: theme.palette.text.hint,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    height: theme.spacing(5),
    margin: `${theme.spacing(2)}px 0`,
  },
}));

export default PickTime;
