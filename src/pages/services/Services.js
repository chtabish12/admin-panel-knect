import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
// components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import Widget from "../../components/Widget/Widget.js";
import useStyles from "./styles";
import { toast } from "react-toastify";
import { AdminPanelService } from "../../Service/AdminPanelService.js";
import { NO_DATA } from "../../helper/Helper.js";

export default function ServicesPage() {

  const classes = useStyles();
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  var _ = require("lodash");

  const fetchData = () => {
    setIsLoading(true);
    AdminPanelService.Service()
      .then((resp) => {
        setIsLoading(false);
        if (resp.data.length) {
          const test = _.orderBy(resp.data, "id", ["asc"]);
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
  }, []);
  
  return (
    <>
      <PageTitle title="My Services" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Widget disableWidgetMenu>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Operator Name</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Tax Rate</th>
                  <th>Keyword</th>
                  <th>Shortcode</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {state
                  ? state.map((state) => {
                      let color =
                        state.status === 1
                          ? "#5cb85c"
                          : state.status === 2
                          ? "#d9534f"
                          : state.status === 3
                          ? "#337ab7"
                          : state.status === 4
                          ? "#f0ad4e"
                          : "rgb(157 0 0)";
                      return (
                        <>
                          <tr>
                            <td>{state.id ? state.id : 0}</td>
                            <td>{state.name ? state.name : "N/A"}</td>
                            <td>{state.operator ? state.operator : "N/A"}</td>
                            <td>{state.productName ? state.productName : 0}</td>
                            <td>{state.pricePoint ? state.pricePoint : 0}</td>
                            <td>{state.taxRate ? state.taxRate : 0}</td>
                            <td>{state.keyword ? state.keyword : 0}</td>
                            <td>{state.shortCode ? state.shortCode : "N/A"}</td>
                            <td style={{ textAlign: "center" }}>
                              {" "}
                              <span
                                style={{ backgroundColor: color }}
                                className={classes.tableStatusCode}
                              >
                                {state.status === 1
                                  ? "Active"
                                  : state.status === 2
                                  ? "Inactive"
                                  : state.status === 3
                                  ? "Suspended Subscription"
                                  : state.status === 4
                                  ? "Suspended Billing"
                                  : "N/A"}
                              </span>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
              </tbody>
            </Table>
            {isLoading && (
              <div className="spinner">
                <RotatingLines width="100" strokeColor="#536DFE" />
              </div>
            )}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
