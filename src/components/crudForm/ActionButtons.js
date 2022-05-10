import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Block } from "@material-ui/icons";

const ActionButtons = ({
  initialTableData,
  editRow,
  serviceFlag,
  AdminFlag,
  blockRow,
  showRow,
}) => {
  return (
    <>
      <IconButton
        onClick={() => {
          editRow(initialTableData);
        }}
      >
        <EditIcon color="secondary" />
      </IconButton>
      {serviceFlag && (
        <>
          <IconButton
            onClick={() => {
              blockRow(initialTableData);
            }}
          >
            <Block color="secondary" />
          </IconButton>
          <IconButton
            onClick={() => {
              showRow(initialTableData);
            }}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
        </>
      )}
      {AdminFlag && (
        <>
          <IconButton
            onClick={() => {
              showRow(initialTableData);
            }}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
        </>
      )}
    </>
  );
};
export default ActionButtons;
