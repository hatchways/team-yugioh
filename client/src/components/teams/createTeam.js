import React from "react";
import { Dialog } from "@material-ui/core";

const CreateTeam = ({ open, closeDialog }) => {
  return (
    <Dialog open={open} onClose={closeDialog}>
      Create your team here
    </Dialog>
  );
};

export default CreateTeam;
