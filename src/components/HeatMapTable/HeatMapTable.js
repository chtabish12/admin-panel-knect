import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Table } from "react-bootstrap";
import "./styles.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Constants";
import axios from "axios";
import moment from "moment";
// components
import useStyles from "../../pages/heatMap/styles";

import Widget from "../Widget/Widget.js";

const HeatMapTable = ({
  affiliatesSelect,
  serviceSelect,
  startDate,
  endDate,
}) => {
  // API
  const [state, setState] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const { handleSubmit } = useForm();
  let heatMapArray = [];
  const classes = useStyles();

  const fetchData = () => {
    let startdate = moment(startDate).format("YYYY-MM-DD");
    let enddate = moment(endDate).format("YYYY-MM-DD");
    const url = `${BASE_URL}report/heatMapReport?`;
    axios
      .get(url, {
        headers: {
          token: sessionStorage.getItem("token-user"),
        },
        params: {
          // serviceId: 8,
          // startDate: "2021-11-01",
          // endDate: "2021-12-30",
          // affiliateId: 1,
          serviceId: `${serviceSelect.value}`,
          startDate: `${startdate}`,
          endDate: `${enddate}`,
          affiliateId: `${affiliatesSelect.value}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200 && resp.data.length) {
          let data = JSON.stringify(resp.data);
          data = JSON.parse(data);
          let netbase = 0;
          let churn = 0;
          let charged = 0;
          let Unsub = 0;
          data.map((element) => {
            const heatMap = [];
            element.heat.map((ele, i) => {
              netbase =
                i === 0
                  ? element.totalSubscribers - ele.unsubCount
                  : netbase - ele.unsubCount;
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
              return heatMap.push({
                ...ele,
                netbase,
                churn,
                charged,
                Unsub,
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
          setState(heatMapArray);
          // console.log("check    ..", heatMapArray);
        } else {
          return toast("Wrong attempt, Please retry!!");
        }
      });
  };
  const formSubmit = () => {
    fetchData();
    setTableShow(true);
  };

  useEffect(() => {
    if (tableShow) {
      fetchData();
    }
  }, [tableShow]);
  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="button-Heat">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            // disabled={!serviceSelectValue.length || !affiliateValue.length}
          >
            Submit
          </Button>
        </div>
      </form>
      {/* </div> */}
      <Grid container spacing={1}>
        <Grid item xs={12} md={20}>
          <Widget disableWidgetMenu>
            {tableShow && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <div className="date-body">
                      <th>Date</th>
                    </div>
                    <th>Total Subscriptions</th>
                    {state
                      ? state.map((state) => {
                          return (
                            <th>
                              <div className="date-header">
                                {moment(state.date).format("YYYY-MM-DD")
                                  ? moment(state.date).format("YYYY-MM-DD")
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
                    ? state.map((state, index) => {
                        return (
                          <>
                            <tbody>
                              <tr>
                                <td>
                                  {moment(state.date).format("YYYY-MM-DD")
                                    ? moment(state.date).format("YYYY-MM-DD")
                                    : "-"}
                                </td>
                                <td>
                                  {state.subscriptions
                                    ? state.subscriptions
                                    : 0}
                                </td>
                                {state.heatMap
                                  ? state.heatMap.map((heat, i) => {
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
                                                    ? Math.floor(
                                                        heat.charged * 1000
                                                      ) /
                                                        1000 +
                                                      "%"
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
                                                    ? Math.floor(
                                                        heat.Unsub * 1000
                                                      ) /
                                                        1000 +
                                                      "%"
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
                                                    ? Math.floor(
                                                        heat.churn * 1000
                                                      ) / 1000
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
            )}
            <>{!tableShow && <p>No Record!!</p>}</>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};
export default HeatMapTable;
