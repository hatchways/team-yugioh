import React from "react";

const MembersToBeInvited = ({ teamMembers }) => {
  const teamMemberNotEmpty = teamMembers.length !== 0;
  return teamMemberNotEmpty && <div>hi</div>;
};

export default MembersToBeInvited;
