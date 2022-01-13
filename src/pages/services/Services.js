import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import Widget from "../../components/Widget/Widget.js";
import { BASE_URL } from "../../Constants";
import useStyles from "./styles";

export default function ServicesPage() {
  const classes = useStyles();
  const [state, setState] = useState("");

  const fetchData = () => {
    fetch(`${BASE_URL}user/services`, {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    })
      .then((response) => response.json())
      .then((data) => setState(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="My Services" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={20}>
          <Widget disableWidgetMenu>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
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
                          : "";
                      return (
                        <>
                          <tr>
                            <td>{state.id ? state.id : 0}</td>
                            <td>{state.name ? state.name : "N/A"}</td>
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
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
