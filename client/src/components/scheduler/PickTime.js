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
    <Grid container className={classes.root} direction="column">
      <Grid item>
        <Typography variant="body1">{date}</Typography>
      </Grid>

      <Grid
        item
        className={classes.list}
        container
        direction="column"
        alignItems="center"
        wrap="nowrap"
      >
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
    width: "100%",
  },
  list: {
    overflowY: "scroll",
    height: theme.spacing(30),
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
    width: theme.spacing(15),
  },
}));

export default PickTime;
