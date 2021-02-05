import React from "react";
import {
  MenuItem,
  makeStyles,
  Paper,
  MenuList,
  Link,
  Popper,
  Grow,
  ClickAwayListener,
} from "@material-ui/core";
import { googleLogout } from "../utils/googleAuth";
import { useHistory } from "react-router-dom";
import { useSetAuthenticated } from "../providers/Context";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: 100,
  },
  link: {
    color: "black",
    cursor: "pointer",
    fontWeight: "bold",
  },
  Menu: {
    marginLeft: 25,
  },
  icon: { marginRight: 10 },
}));

export default function UserMenu({ name }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const setAuthenticated = useSetAuthenticated();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      event &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleLogout = () => {
    setAuthenticated(false);
    googleLogout();
    handleClose();
    history.push("/login");
  };

  const handleTeamsButton = () => {
    handleClose();
    history.push("/teams");
  };

  return (
    <div className={classes.root}>
      <Link
        variant="subtitle1"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.link}
        data-cy="userMenu"
      >
        {name}
      </Link>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.Menu}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleTeamsButton}>
                    <PeopleOutlineIcon className={classes.icon} />
                    Manage Teams
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon className={classes.icon} />
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
