import React, { useState, useEffect } from "react";
import Widget from "../Widget/Widget.js";
import { IconButton } from "@material-ui/core";
import "../../styles.css";
import {
  DataGrid,
  // GridToolbarContainer,
  // GridToolbarExport,
} from "@mui/x-data-grid";
import { Search, Clear } from "@material-ui/icons";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const TableCRUD = ({ initialTableData, column }) => {
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = useState(initialTableData);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = initialTableData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  // function CustomToolbar() {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarExport />
  //     </GridToolbarContainer>
  //   );
  // }

  useEffect(() => {
    setRows(initialTableData);
  }, [initialTableData]);

  return (
    <>
      <Widget style={{ height: "80vh", width: "100%" }}>
        <div style={{ height: "76vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={column}
            pageSize={11}
            rowsPerPageOptions={[11]}
            components={{
              Toolbar: QuickSearchToolbar,
              // Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
              },
            }}
          />
        </div>
      </Widget>
    </>
  );
};

export default TableCRUD;
