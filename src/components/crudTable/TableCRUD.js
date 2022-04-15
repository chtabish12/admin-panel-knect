import React from "react";
import Widget from "../Widget/Widget.js";
// import { Link } from "react-router-dom";
import "./styles.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
// import editicon from "../crudForm/assets/edit.png";
// import trashicon from "../crudForm/assets/trash.png";
// import blockicon from "../crudForm/assets/block.png";

const TableCRUD = ({ initialTableData, column }) => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <Widget  style={{ height: "77vh", width: "100%" }}>
        <div style={{ height: "75vh", width: "100%" }}>
          <DataGrid
            rows={initialTableData}
            columns={column}
            pageSize={11}
            rowsPerPageOptions={[11]}
            components={{
              Toolbar: CustomToolbar,
            }}
            // checkboxSelection
          />
        </div>
      </Widget>
    </>
  );
};
export default TableCRUD;
