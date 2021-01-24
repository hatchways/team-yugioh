import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import EventTypesTab from './EventTypesTab';
import { UserContextProvider } from '../../context/UserContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const StyledTab = withStyles((theme) => ({
  root: {
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontSize: '1rem',
    '&:hover': {
      color: 'orange',
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export default function SelectTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.root} maxWidth='xl'>
      <div position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <StyledTab label='Event Types' {...a11yProps(0)} />
          <StyledTab
            classes={classes.tab}
            label='Scheduled Events'
            {...a11yProps(1)}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <UserContextProvider>
          <EventTypesTab />
        </UserContextProvider>
      </TabPanel>
      <TabPanel value={value} index={1}>
        You currently have no scheduled events...
      </TabPanel>
    </Container>
  );
}
