import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

const AdminAddPermissions = (props) => {
  const { permission, memberIdx, handleAttendingChange } = props;
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={permission.status} // boolean true/false
            onChange={() => {
              handleAttendingChange(memberIdx, !permission.status);
            }}
          />
        }
        label={permission.name}
      />
    </>
  );
};

export default AdminAddPermissions;
