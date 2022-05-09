import React from "react";
import Widget from "../Widget/Widget.js";
import "../../styles.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

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
      <Widget style={{ height: "77vh", width: "100%" }}>
        <div style={{ height: "75vh", width: "100%" }}>
          <DataGrid
            rows={initialTableData}
            columns={column}
            pageSize={11}
            rowsPerPageOptions={[11]}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </Widget>
    </>
  );
};

export default TableCRUD;
