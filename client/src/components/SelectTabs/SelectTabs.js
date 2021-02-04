import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import EventTypesTab from "./EventTypesTab";
import TeamPage from "../teams/TeamPage"; //should have named this TeamTab, my bad
import ScheduledAppointmentsTab from "../ScheduledAppointments/ScheduledAppointmentsTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box pt={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.any,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
    minWidth: 50,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontSize: "1rem",
    "&:hover": {
      color: "orange",
      opacity: 1,
    },
    "&$selected": {
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
  // ADDING RESPONSIVE SCREEN SIZE FOR MOBILE
  const [state, setState] = useState({
    mobileView: false,
  });
  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Tabs
        direction="vertical"
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <StyledTab label="Event Types" />
        <StyledTab label="Scheduled Appointments" />
        <StyledTab label="Teams" />
      </Tabs>
    );
  };

  const displayMobile = () => {
    return (
      <Tabs
        direction="vertical"
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <StyledTab style={{ width: "50px" }} label="Event Types" />
        <StyledTab style={{ width: "50px" }} label="Sched. Appts" />
        <StyledTab style={{ width: "50px" }} label="Teams" />
      </Tabs>
    );
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <div position="static">
        {mobileView ? displayMobile() : displayDesktop()}
      </div>
      <TabPanel value={value} index={0}>
        <EventTypesTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScheduledAppointmentsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TeamPage />
      </TabPanel>
    </Container>
  );
}
