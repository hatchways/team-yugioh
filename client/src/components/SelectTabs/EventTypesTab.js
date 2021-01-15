import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import EventGrid from '../UserEvents/EventGrid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ProfileImage from './../../img/user-image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  profileAndNewTypeBox: {
    marginBottom: theme.spacing(5),
  },
  avatar: {
    marginRight: theme.spacing(2),
    background: theme.palette.secondary.main,
  },
  name: {
    fontWeight: 500,
  },
  userUrl: {
    color: 'gray',
  },
  newEventTypeButton : {
    padding: ".5rem 2rem",
    textTransform: 'none',
    marginBotton: theme.spacing(4)
  }
}));

export default function EventTypesTab() {
  const classes = useStyles();

  /* USER PROFILE + NEW EVENT TYPE BTN */
  return (
    <Container>
      <Grid
        container
        direction='row'
        justify='space-between'
      >
        <Grid item display='flex'
        className={classes.profileAndNewTypeBox}>
          <Avatar className={classes.avatar} src={ProfileImage} alt = "User image"/>
          <Box >
            <Typography className={classes.name}>John Doe</Typography>
            <Typography className={classes.userUrl}>
              calendapp.com/john-doe
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            className={classes.newEventTypeButton}
            color='secondary'
            variant='outlined'
          >
            + New Event Type
          </Button>
          </Grid>
      </Grid>
      {/* TYPE OF EVENT CARDS */}
      <EventGrid />
    </Container>
  );
}
