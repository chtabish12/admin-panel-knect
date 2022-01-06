import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Table } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import { useForm } from "react-hook-form";
import "./styles.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Constants";

//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle.js";
import Widget from "../../components/Widget/Widget.js";

export default function ReportsPage() {
  // local
  const classes = useStyles();
  const [productSelect, setProductSelect] = useState([]);
  const [serviceSelect, setServiceSelect] = useState([]);
  const [tableShow, setTableShow] = useState(false);
  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  // API
  const [state, setState] = useState("");
  const { handleSubmit } = useForm();

  // API DATA from login
  let productArray = [];
  const ApiData = JSON.parse(localStorage.getItem("api-data"));
  for (let x = 0; x < ApiData.length; x++) {
    productArray.push({
      value: ApiData[x].product.id,
      label: ApiData[x].product.name,
    });
  }
  let serviceArray = [];
  for (let x = 0; x < ApiData.length; x++) {
    for (let i = 0; i < ApiData[x].services.length; i++) {
      if (ApiData[x].services[i] !== null) {
        serviceArray.push({
          value: ApiData[x].services[i].id,
          label: ApiData[x].services[i].name,
        });
      }
    }
  }

  const fetchData = async () => {
    let servicesIds = serviceSelect[0].value;
    let startdate = moment(startDate).format("YYYY-MM-DD");
    let enddate = moment(endDate).format("YYYY-MM-DD");
    let productIds = productSelect[0].value;

    const url = `${BASE_URL}services/report?serviceIds=${servicesIds}&startDate='${startdate}'&endDate='${enddate}'&productIds=${productIds}`;
    let fetchCall = await fetch(url, {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
    if (fetchCall.status !== 200) {
      return toast("Wrong attempt, Please retry!!");
    } else {
      let resp = await fetchCall.json();
      if (resp.length) {
        setState(resp);
        setTableShow(true);
      } else {
        return toast("Wrong attempt, Please retry!!");
      }
    }
  };

  const formSubmit = async () => {
    fetchData();
  };
  useEffect(() => {}, []);
  return (
    <>
      <PageTitle title="Reports" />
      <div className={classes.dashedBorder}>
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <div className="multiSelect">
            Products
            <MultiSelect
              options={productArray}
              value={productSelect}
              onChange={setProductSelect}
              labelledBy="Products"
              // disableSearch={true}
              // hasSelectAll={false}
            />
          </div>
          <div className="multiSelect">
            Services
            <MultiSelect
              options={serviceArray}
              value={serviceSelect}
              onChange={setServiceSelect}
              labelledBy="Services"
              // disableSearch={true}
              // hasSelectAll={false}
            />
          </div>
          <div className="header-right">
            <div>
              Start date
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              End date
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <Button
              className="button"
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              disabled={(!productSelect.length, !serviceSelect.length)}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={20}>
          <Widget disableWidgetMenu>
            {tableShow && (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Revenue</th>
                    <th>Charged Users</th>
                    <th>New Subs</th>
                    <th>New Subs Charging</th>
                    <th>Renewals</th>
                    <th>Same Day UnSubs</th>
                    <th>Total UnSubs</th>
                    <th>New User Base</th>
                    <th>Net Charging</th>
                  </tr>
                </thead>
                <tbody>
                  {state
                    ? state.map(function (state) {
                        return (
                          <>
                            <tr>
                              <td>
                                {moment(state.createdAt).format("YYYY-MM-DD")
                                  ? moment(state.createdAt).format("YYYY-MM-DD")
                                  : "N/A"}
                              </td>
                              <td>
                                {state.totalRevenue ? state.totalRevenue : 0}
                              </td>
                              <td>
                                {state.chargedCustomers
                                  ? state.chargedCustomers
                                  : 0}
                              </td>
                              <td>
                                {state.newSubsChargingCount
                                  ? state.newSubsChargingCount
                                  : 0}
                              </td>
                              <td>
                                {state.newSubsChargingPercentage
                                  ? state.newSubsChargingPercentage
                                  : 0}
                              </td>
                              <td>
                                {state.renewalPercentage
                                  ? state.renewalPercentage
                                  : 0}
                              </td>
                              <td>
                                {state.sameDayUnsub ? state.sameDayUnsub : 0}
                              </td>
                              <td>
                                {state.Unsubscriptions
                                  ? state.Unsubscriptions
                                  : 0}
                              </td>
                              <td>{state.totalBase ? state.totalBase : 0}</td>
                              <td>
                                {state.chargingPercentage
                                  ? state.chargingPercentage
                                  : 0}
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : ""}
                </tbody>
              </Table>
            )}
            <>{!tableShow && <p>No Record!!</p>}</>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
