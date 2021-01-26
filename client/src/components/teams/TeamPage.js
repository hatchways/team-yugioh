import React, { useState } from "react";
import { Button } from "@material-ui/core";

import CreateTeam from "./CreateTeam";

const TeamPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <Button
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

export default TeamPage;
