import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import EventGrid from '../UserEvents/EventGrid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    background: theme.palette.secondary.main
  },
}));

export default function EventTypesTab() {
  const classes = useStyles();

  /* USER PROFILE + NEW EVENT TYPE BTN */
  return (
    <Container>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex'>
          <Avatar className={classes.avatar}>JD</Avatar>
          <span>
            <Typography>John Doe</Typography>
            <Typography>calendapp.com/john-doe</Typography>
          </span>
        </Box>
        <Box>
          <Button color="secondary" variant='outlined'>
           + New Event Type
            </Button>
        </Box>
      </Box>
      {/* TYPE OF EVENT CARDS */}
      <EventGrid />
    </Container>
  );
}
