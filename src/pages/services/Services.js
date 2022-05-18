import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import TableCRUD from "../../components/crudTable/TableCRUD";
import { toast } from "react-toastify";
import { AdminPanelService } from "../../Service/AdminPanelService.js";
import { NO_DATA } from "../../helper/Helper.js";

export default function ServicesPage() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowCounts, setRowCount] = useState(0);

  var _ = require("lodash");
  const classes = useStyles();
  // Define Columns
  const column = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "operator", headerName: "Operator Name", flex: 1 },
    { field: "productName", headerName: "Product", flex: 1 },
    { field: "pricePoint", headerName: "Price", flex: 1 },
    {
      field: "taxRate",
      headerName: "Tax Rate",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>N/A</span> : rowData.value;
      },
    },
    {
      field: "keyword",
      headerName: "Keyword",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>0</span> : rowData.value;
      },
    },
    {
      field: "shortCode",
      headerName: "Shortcode",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>N/A</span> : rowData.value;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (rowData) => {
        return rowData.value === 1 ? (
          <span
            className={classes.tableStatusCode}
            style={{ backgroundColor: "#5cb85c", fontWeight: "bold" }}
          >
            Active
          </span>
        ) : rowData.value === 2 ? (
          <span
            className={classes.tableStatusCode}
            style={{ backgroundColor: "#d9534f", fontWeight: "bold" }}
          >
            Inactive
          </span>
        ) : rowData.value === 3 ? (
          <span
            className={classes.tableStatusCode}
            style={{ backgroundColor: "#337ab7", fontWeight: "bold" }}
          >
            Suspended Subscription
          </span>
        ) : rowData.value === 4 ? (
          <span
            className={classes.tableStatusCode}
            style={{ backgroundColor: "#f0ad4e", fontWeight: "bold" }}
          >
            Suspended Billing
          </span>
        ) : (
          <span
            className={classes.tableStatusCode}
            style={{ backgroundColor: "#rgb(157 0 0)", fontWeight: "bold" }}
          >
            N/A
          </span>
        );
      },
    },
  ];

  const fetchData = () => {
    setIsLoading(true);
    AdminPanelService.Service(page)
      .then((resp) => {
        setRowCount(resp.data.totalCount);
        setIsLoading(false);
        if (resp.data.services.length) {
          const test = _.orderBy(resp.data.services, "id", ["asc"]);
          setState(test);
        } else {
          return toast(NO_DATA);
        }
      })
      .catch(() => toast(NO_DATA));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [setPage, page]);

  return (
    <>
      <PageTitle title="My Services" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          {state && (
            <TableCRUD
              initialTableData={state}
              column={column}
              page={page}
              setPage={setPage}
              rowCounts={rowCounts}
            />
          )}
          {isLoading && (
            <div className="spinner">
              <RotatingLines width="100" strokeColor="#536DFE" />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
