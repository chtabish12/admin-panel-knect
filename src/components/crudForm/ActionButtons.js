import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Block } from "@material-ui/icons";

const ActionButtons = ({
  initialTableData,
  editRow,
  serviceFlag,
  blockRow,
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
        <IconButton
          onClick={() => {
            blockRow(initialTableData);
          }}
        >
          <Block color="secondary" />
        </IconButton>
      )}
    </>
  );
};
export default ActionButtons;
