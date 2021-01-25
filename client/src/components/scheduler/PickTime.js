import React, { useState, useEffect } from "react";
import { Grid, ListItem, makeStyles, Typography } from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";
import { format } from "date-fns";
import PropTypes from "prop-types";
import axios from "axios";
import {getTimeSlots} from "../../utils/calendarUtils"

const PickTime = ({selectedDate, interval, availabilityTimes}) => {
  const classes = useStyles();
  const date = format(selectedDate, "EEEE, LLL do");
  let isoDate=new Date(selectedDate);
  isoDate.setHours(0,0,0,0);
  isoDate=isoDate.toISOString();


  const [timeSlots, setTimeSlots] = useState([]);

  //appointment length
  useEffect(() => {
    //fetch from backend
    axios.get(`/api/calendar/availability?day=${isoDate}`, {
      withCredentials: true
    }).then(res=>{
      setTimeSlots(getTimeSlots(res.data.availability, interval, availabilityTimes))
      }).catch(err=>console.log(err))
    
  }, [date]);





  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      wrap="nowrap"
      spacing={2}
      alignItems="center"
    >
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
        {timeSlots.length !== 0 &&
          timeSlots.map((slot, i) => (
            <ListItem key={i} className={classes.listItem} button>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Brightness1 color="primary" className={classes.icon} />
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
    height: theme.spacing(40),
  },
  icon: {
    width: theme.spacing(1.4),
    height: theme.spacing(1.4),
  },
  listItem: {
    borderColor: theme.palette.text.hint,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    height: theme.spacing(5),
    margin: `${theme.spacing(0.5)}px 0`,
    width: theme.spacing(15),
  },
}));

PickTime.propTypes = {
  selectedDate: PropTypes.object,
};

export default PickTime;
