import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

import CreateTeam from "./CreateTeam";

const TeamPage = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <Button
        className={classes.createTeamButton}
        variant="outlined"
        color="secondary"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        Create new team
      </Button>
      <CreateTeam
        open={openDialog}
        closeDialog={() => {
          setOpenDialog(false);
        }}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  createTeamButton: {
    padding: ".5rem 2rem",
    textTransform: "none",
    marginBotton: theme.spacing(4),
  },
}));
export default TeamPage;
