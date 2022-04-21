import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

const AdminAddPermissions = (props) => {
  const { permission, index, handleAttendingChange } = props;
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={permission.status} // boolean true/false
            onChange={() => {
              handleAttendingChange(index, !permission.status);
            }}
          />
        }
        label={<div style={{ marginLeft: "20px" }}>{permission.name}</div>}
      />
    </>
  );
};

export default AdminAddPermissions;
