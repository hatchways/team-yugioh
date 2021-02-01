import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    transition: "none",
    border: `1px solid rgba(0, 0, 0, 0);`,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.primary.main}`
    }
  },
  endIcon: {
    marginLeft: "-8px"
  },
  startIcon: {
    textDecoration: "none",
    color: "#00a2ff",
    fontSize: 14
  },
  popover: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function UserActionsMenu({ children }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        color="secondary"
        startIcon={<FontAwesomeIcon icon={faCog} />}
        endIcon={<ArrowDropDownIcon />}
        classes={{ endIcon: classes.endIcon, root: classes.root }}
        onClick={handleClick}
      ></Button>
      <Popover
        open={open}
        classes={{ paper: classes.popover }}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {children}
      </Popover>
    </>
  );
}
