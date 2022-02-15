import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Table } from "react-bootstrap";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// components
import Widget from "../Widget/Widget.js";
import Doc from "./DocService";
import PdfContainer from "./PdfContainer";

const HeatMapTable = ({ dataShow, data }) => {
  // API
  const [state, setState] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const [heatMapDate, setHeatMapDate] = useState();
  let heatMapArray = [];
  const createPdf = (html) => Doc.createPdf(html);

  const fetchData = () => {
    let netbase = 0;
    let churn = 0;
    let charged = 0;
    let Unsub = 0;
    //eslint-disable-next-line
    data.map((element) => {
      const heatMap = [];
      element.heat.map((ele, i) => {
        Unsub =
          i === 0
            ? (ele.unsubCount / element.totalSubscribers) * 100
            : (ele.unsubCount / netbase) * 100;
        churn =
          i === 0
            ? (ele.unsubCount / element.totalSubscribers) * 100
            : (ele.unsubCount / netbase) * 100;
        charged =
          i === 0
            ? (ele.chargeCount / element.totalSubscribers) * 100
            : (ele.chargeCount / netbase) * 100;
        netbase =
          i === 0
            ? element.totalSubscribers - ele.unsubCount
            : netbase - ele.unsubCount;
        return heatMap.push({
          ...ele,
          churn,
          charged,
          Unsub,
          netbase,
        });
      });

      heatMapArray.push({
        date: element.reportDate,
        subscriptions: element.totalSubscribers,
        heatMap,
      });
    });
    heatMapArray.forEach((data, index) => {
      const dumyObject = {
        Unsub: "-",
        chargeCount: "-",
        charged: "-",
        churn: "-",
        netbase: "-",
        reportDate: "-",
        reportOf: "-",
        unsubCount: "-",
      };
      for (let i = 1; i <= index; i++) {
        data.heatMap.unshift(dumyObject);
      }
    });
    setHeatMapDate(heatMapArray[0].heatMap);
    setState(heatMapArray);
    setTableShow(true);
  };
  useEffect(() => {
    if (dataShow) {
      fetchData();
    }
    //eslint-disable-next-line
  }, [data]);
  return (
    //eslint-disable-next-line
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Widget disableWidgetMenu>
            {tableShow && (
              <PdfContainer createPdf={createPdf}>
                <>
                  <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    id="emp"
                    className="table"
                  >
                    <thead>
                      <tr>
                        <div className="date-body">
                          <th>Date</th>
                        </div>
                        <th>Total Subscriptions</th>
                        {heatMapDate
                          ? heatMapDate.map((state) => {
                              return (
                                <th>
                                  <div className="date-header">
                                    {moment(state.reportOf).format("YYYY-MM-DD")
                                      ? moment(state.reportOf).format(
                                          "YYYY-MM-DD"
                                        )
                                      : "N/A"}
                                  </div>
                                  <thead>
                                    <tr>
                                      <div className="header-subHeadings">
                                        <th>Charged</th>
                                        <th>Charged %</th>
                                        <th>Unsub</th>
                                        <th>Unsub %</th>
                                        <th>Netbase</th>
                                        <th>Churn %</th>
                                      </div>
                                    </tr>
                                  </thead>
                                </th>
                              );
                            })
                          : ""}
                      </tr>
                    </thead>
                    <>
                      {state
                        ? state.map((state) => {
                            return (
                              <>
                                <tbody>
                                  <tr>
                                    <td>
                                      {moment(state.date).format("YYYY-MM-DD")
                                        ? moment(state.date).format(
                                            "YYYY-MM-DD"
                                          )
                                        : "-"}
                                    </td>
                                    <td>
                                      {new Intl.NumberFormat().format(
                                        state.subscriptions
                                      )
                                        ? new Intl.NumberFormat().format(
                                            state.subscriptions
                                          )
                                        : 0}
                                    </td>
                                    {state.heatMap
                                      ? state.heatMap.map((heat) => {
                                          return (
                                            <>
                                              <td>
                                                <thead>
                                                  <tr>
                                                    <td>
                                                      {heat.chargeCount
                                                        ? heat.chargeCount
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {typeof heat.charged !==
                                                      "string"
                                                        ? heat.charged.toFixed(
                                                            2
                                                          ) + "%"
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {heat.unsubCount
                                                        ? heat.unsubCount
                                                        : "0"}
                                                    </td>
                                                    <td>
                                                      {typeof heat.charged !==
                                                      "string"
                                                        ? heat.Unsub.toFixed(
                                                            2
                                                          ) + "%"
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {heat.netbase
                                                        ? heat.netbase
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {typeof heat.charged !==
                                                      "string"
                                                        ? heat.churn.toFixed(2)
                                                        : "-"}
                                                    </td>
                                                  </tr>
                                                </thead>
                                              </td>
                                            </>
                                          );
                                        })
                                      : ""}
                                  </tr>
                                </tbody>
                              </>
                            );
                          })
                        : ""}
                    </>
                  </Table>
                </>
              </PdfContainer>
            )}
            <>{!tableShow && <p>No Record!!</p>}</>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};
export default HeatMapTable;
