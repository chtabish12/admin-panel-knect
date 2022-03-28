import React, { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Grid, Button, Typography } from "@material-ui/core";
import { RotatingLines, LineWave } from "react-loader-spinner";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Doc from "./DocService";
import PdfContainer from "../../components/HeatMapTable/PdfContainer";
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
import { NO_DATA, WRONG_ATTEMPT, WRONG_SELECTION } from "../../helper/Helper";
// components
import Widget from "../../components/Widget/Widget.js";
import Filters from "../../components/filters/Filters";
const PageTitle = lazy(() => import("../../components/PageTitle/PageTitle.js"));

const Reports = () => {
  // local
  const classes = useStyles();
  const createPdf = (html) => Doc.createPdf(html);
  const ReportFlag = true;
  const [tableShow, setTableShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  // API
  const [state, setState] = useState("");
  const { handleSubmit } = useForm();
  // Redux
  const productID = useSelector((state) => state.filtersData.productSet);
  const serviceID = useSelector((state) => state.filtersData.serviceSet);
  let price;

  const fetchData = async () => {
    let startdate = moment(startDate).format("YYYY-MM-DD");
    let enddate = moment(endDate).format("YYYY-MM-DD");

    AdminPanelService.Reporting(serviceID, startdate, enddate, productID)
      .then((resp) => {
        if (resp.statusText !== "OK") {
          return toast(WRONG_ATTEMPT);
        } else if (resp.data && resp.statusText === "OK") {
          // eslint-disable-next-line
          resp.data.map((ele) => {
            for (const [, element] of Object.entries(ele.report)) {
              const pricePoints = JSON.parse(element.revenueSegregation);
              price = "N/A";
              // eslint-disable-next-line
              {
                if (pricePoints && pricePoints !== "{}")
                  // eslint-disable-next-line
                  [pricePoints]?.forEach((ele) => {
                    if (!ele && ele === "{}") {
                      return (price = "N/A");
                    } else {
                      price = [];
                      for (let i = 0; i < ele.length; i++) {
                        price.push(
                          <text>
                            P: {ele[i].price}; C:{" "}
                            {new Intl.NumberFormat().format(
                              ele[i].subscriptions
                            )}{" "}
                            <br />
                          </text>
                        );
                      }
                    }
                  });
              }
              element.revenueSegregationArray = price;
            }
            setState([]);
            setState(resp.data);
          });
          setTableShow(true);
          setLoading(false);
        } else {
          return toast(NO_DATA);
        }
      })
      .catch(() => toast(WRONG_SELECTION));
  };

  const formSubmit = async () => {
    setLoading(true);
    setTableShow(false)
    fetchData();
  };
  return (
    <>
      <Suspense fallback={<div className="spinner"><LineWave/></div>}>
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
                disabled={!serviceID}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      {!tableShow && !loading && (
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Widget disableWidgetMenu>
              <p>No Record!!</p>
            </Widget>
          </Grid>
        </Grid>
      )}
      {loading && (
        <div className="spinner">
          <RotatingLines width="100" strokeColor="#536DFE" />
        </div>
      )}
      {tableShow && (
        <>
          <div className="CSV-button-div">
            <ReactHTMLTableToExcel
              className="btn btn-info csv-button"
              table="emp"
              filename="ServiceReporting"
              sheet="Sheet"
              buttonText="Export CSV"
            />
          </div>
          <PdfContainer
            createPdf={createPdf}
            buttonClass={"btn btn-info csv-button-pdf"}
            sectionClass={"CSV-button-div"}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <Widget disableWidgetMenu>
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
                          <th>Price Points</th>
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
                      {state
                        ? state.map((name) => {
                            return (
                              <>
                                <Typography className="serviceName">
                                  {name.serviceName}
                                </Typography>
                                <tbody>
                                  {name
                                    ? name.report.map((state) => {
                                        return (
                                          <>
                                            <tr>
                                              <td>
                                                {moment(state.reportOf).format(
                                                  "YYYY-MM-DD"
                                                )
                                                  ? moment(
                                                      state.reportOf
                                                    ).format("YYYY-MM-DD")
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
                                              <td className="td-width">
                                                {state.revenueSegregationArray
                                                  ? state.revenueSegregationArray
                                                  : ""}
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
                                                  state.newSubsChargingPercentage *
                                                  100
                                                ).toFixed(2) + "%"
                                                  ? (
                                                      state.newSubsChargingPercentage *
                                                      100
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
                                                {(
                                                  state.renewalPercentage * 100
                                                ).toFixed(2) + "%"
                                                  ? (
                                                      state.renewalPercentage *
                                                      100
                                                    ).toFixed(2) + "%"
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
                                                {state.Subscriptions
                                                  ? (
                                                      (state.sameDayUnsub *
                                                        100) /
                                                      state.Subscriptions
                                                    ).toFixed(2) + "%"
                                                    ? (
                                                        (state.sameDayUnsub *
                                                          100) /
                                                        state.Subscriptions
                                                      ).toFixed(2) + "%"
                                                    : 0
                                                  : "0.00%"}
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
                                                {(
                                                  state.chargingPercentage * 100
                                                ).toFixed(2) + "%"
                                                  ? (
                                                      state.chargingPercentage *
                                                      100
                                                    ).toFixed(2) + "%"
                                                  : 0}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })
                                    : ""}
                                </tbody>
                              </>
                            );
                          })
                        : ""}
                    </Table>
                  </>
                </Widget>
              </Grid>
            </Grid>
          </PdfContainer>
        </>
      )}{" "}
      <> </>
    </>
  );
};
export default Reports;
