import React, { useState, useEffect, lazy, Suspense } from "react";
import { Grid, Button } from "@material-ui/core";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { toast } from "react-toastify";
//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import useStyles from "./styles";
import "./styles.css";

import { AdminPanelService } from "../../Service/AdminPanelService";
// components
import Widget from "../../components/Widget/Widget.js";
import Filters from "../../components/filters/Filters";
const PageTitle = lazy(() => import("../../components/PageTitle/PageTitle.js"));

const Reports = () => {
  // local
  const classes = useStyles();
  const ReportFlag = true;
  const [tableShow, setTableShow] = useState(false);

  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  // API
  const [state, setState] = useState("");
  const { handleSubmit } = useForm();

  const fetchData = async () => {
    let startdate = moment(startDate).format("YYYY-MM-DD");
    let enddate = moment(endDate).format("YYYY-MM-DD");

    AdminPanelService.Reporting(
      localStorage.getItem("service-data"),
      startdate,
      enddate,
      localStorage.getItem("product-data")
    ).then((resp) => {
      if (resp.status !== 200) {
        return toast("Wrong attempt, Please retry!!");
      } else 
        if (resp.data.length && resp.status === 200) {
          setState(resp.data);
          setTableShow(true);
        } else {
          return toast("No Record, Please retry!!");
        }
    }).catch(()=> toast("Wrong Selection, Please retry!!"))
  };

  const formSubmit = async () => {
    fetchData();
  };
  useEffect(() => {}, []);
  return (
    <>
      <Suspense fallback={<></>}>
        <PageTitle title="Reports" />
      </Suspense>
      <div className={classes.dashedBorder}>
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <Filters ReportFlag={ReportFlag} />
          <div className="header-right-reporting">
            <div>
              Start date
              <DatePicker
                className="date-input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              End date
              <DatePicker
                className="date-input"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="button-reporting">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // disabled={!localStorage.getItem("service-data")}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      {tableShow && (
        <div className="CSV-button-div">
          <ReactHTMLTableToExcel
            className="btn btn-info csv-button"
            table="emp"
            filename="ServiceReporting"
            sheet="Sheet"
            buttonText="Export CSV"
          />
        </div>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Widget disableWidgetMenu>
            {tableShow && (
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
                      <th>Date</th>
                      <th>Revenue</th>
                      <th>Charged Users</th>
                      <th>New Subs #</th>
                      <th>New Subs Charging #</th>
                      <th>New Subs Charging %</th>
                      <th>Renewals #</th>
                      <th>Renewals %</th>
                      <th>Same Day UnSubs #</th>
                      <th>Same Day UnSubs %</th>
                      <th>Total UnSubs</th>
                      <th>New User Base</th>
                      <th>Net Charging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state
                      ? state.map((state) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  {moment(state.createdAt).format("YYYY-MM-DD")
                                    ? moment(state.createdAt).format(
                                        "YYYY-MM-DD"
                                      )
                                    : "N/A"}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.totalRevenue
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.totalRevenue
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.chargedCustomers
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.chargedCustomers
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.Subscriptions
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.Subscriptions
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.newSubsChargingCount
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.newSubsChargingCount
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {(
                                    state.newSubsChargingPercentage * 100
                                  ).toFixed(2) + "%"
                                    ? (
                                        state.newSubsChargingPercentage * 100
                                      ).toFixed(2) + "%"
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.renewalCount
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.renewalCount
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {(state.renewalPercentage * 100).toFixed(2) +
                                  "%"
                                    ? (state.renewalPercentage * 100).toFixed(
                                        2
                                      ) + "%"
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.sameDayUnsub
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.sameDayUnsub
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {(
                                    (state.sameDayUnsub * 100) /
                                    state.Subscriptions
                                  ).toFixed(2) + "%"
                                    ? (
                                        (state.sameDayUnsub * 100) /
                                        state.Subscriptions
                                      ).toFixed(2) + "%"
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.Unsubscriptions
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.Unsubscriptions
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {new Intl.NumberFormat().format(
                                    state.totalBase
                                  )
                                    ? new Intl.NumberFormat().format(
                                        state.totalBase
                                      )
                                    : 0}
                                </td>
                                <td>
                                  {(state.chargingPercentage * 100).toFixed(2) +
                                  "%"
                                    ? (state.chargingPercentage * 100).toFixed(
                                        2
                                      ) + "%"
                                    : 0}
                                </td>
                              </tr>
                            </>
                          );
                        })
                      : ""}
                  </tbody>
                </Table>
              </>
            )}
            <>{!tableShow && <p>No Record!!</p>}</>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};
export default Reports;
