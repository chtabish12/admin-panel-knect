import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Block } from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";

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
        <Tooltip title="Edit">
          <EditIcon color="secondary" />
        </Tooltip>
      </IconButton>
      {serviceFlag && (
        <>
          <IconButton
            onClick={() => {
              blockRow(initialTableData);
            }}
          >
            <Tooltip title="block">
              <Block color="secondary" />
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => {
              showRow(initialTableData);
            }}
          >
            <Tooltip title="view">
              <VisibilityIcon color="primary" />
            </Tooltip>
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
            <Tooltip title="view">
              <VisibilityIcon color="primary" />
            </Tooltip>
          </IconButton>
        </>
      )}
    </>
  );
};
export default ActionButtons;
