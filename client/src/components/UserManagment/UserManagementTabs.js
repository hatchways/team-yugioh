import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Divider } from "@material-ui/core";
import ActiveTab from "../UserManagment/ActiveTab";
import PendingTab from "../UserManagment/PendingTab";
import TemplatesTab from "../UserManagment/TemplatesTab";
import TeamEventsTab from "../UserManagment/TeamEvents";
import Badge from "@material-ui/core/Badge";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index, disabled) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    disabled: disabled
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(5)
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  noPadding: {
    padding: 0
  },
  badgePosition: {
    top: 10,
    right: 5
  },
  badgeColor: {
    color: "white"
  }
}));

const StyledTab = withStyles(theme => ({
  noPadding: {
    padding: 0
  },
  root: {
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontSize: "1rem",
    "&:hover": {
      color: "orange",
      opacity: 1
    },
    "&$selected": {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

export default function UserManagementTabs({teamID}) {
  const classes = useStyles();
  const [teamMembersData, setTeamData]=useState([]);

  const [value, setValue] = useState(0);

  useEffect(()=>{
    axios.get(`/api/team/members/${teamID}`).then(res=>{
      setTeamData(res.data);
      console.log(res.data)
    })
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <StyledTab label="Active" {...a11yProps(0)} />
          <StyledTab classes={classes.tab} label="Pending" {...a11yProps(1)} />
          <StyledTab
            classes={classes.tab}
            label="Team Event"
            {...a11yProps(2)}
          />
          <Badge
            badgeContent="Coming Soon"
            color="primary"
            classes={{
              anchorOriginTopRightRectangle: classes.badgePosition,
              colorPrimary: classes.badgeColor
            }}
          >
            <StyledTab
              classes={classes.tab}
              label="Templates"
              {...a11yProps(3, true)}
            />
          </Badge>
        </Tabs>
      </div>
      <Divider variant="fullWidth" />
      <TabPanel value={value} index={0}>
        <ActiveTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PendingTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TeamEventsTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TemplatesTab />
      </TabPanel>
    </>
  );
}
