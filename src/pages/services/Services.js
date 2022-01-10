import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import Widget from "../../components/Widget/Widget.js";
import { BASE_URL } from "../../Constants";

export default function ServicesPage() {
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
                  <th>Name</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Tax Rate</th>
                  <th>Keyword</th>
                  <th>Shortcode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {state
                  ? state.map((state, key)=> {
                      return (
                        <>
                          <tr>
                            <td>{state.name ? state.name : "N/A"}</td>
                            <td>{state.productName ? state.productName : 0}</td>
                            <td>{state.pricePoint ? state.pricePoint : 0}</td>
                            <td>{state.taxRate ? state.taxRate : 0}</td>
                            <td>{state.keyword ? state.keyword : 0}</td>
                            <td>{state.shortcode ? state.shortcode : 0}</td>
                            <td>{state.status ? state.status : 0}</td>
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
