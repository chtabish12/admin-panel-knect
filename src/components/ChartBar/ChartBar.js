import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { toast } from "react-toastify";
import moment from "moment";
// import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
// import DatePicker from "react-datepicker";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import "./ChartBar.css";
import { BASE_URL } from "../../../src/Constants";
import "../../styles.css";
// import _ from "lodash";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "0",
    padding: "22px",
    fontSize: "0.7rem !important",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root
    {...restProps}
    className={`${classes.root} ${classes["Component-root-98"]} ${classes["LegendRoot-root-105"]} ${classes["LegendItem-root-109"]}`}
  />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
    fontSize: "0.4rem !important",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

///////////////component
const ChartBar = ({ region, label, y, z }) => {
  // local
  const [productSelect, setProductSelect] = useState([]);
  const [serviceSelect, setServiceSelect] = useState([]);
  const [mystate, setmyState] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  let productArray = [];
  const ApiData = JSON.parse(localStorage.getItem("api-data"));
  for (let x = 0; x < ApiData[y].products.length; x++) {
    productArray.push({
      value: ApiData[y].products[x].id,
      label: ApiData[y].products[x].name,
    });
  }
  let serviceArray = [];
  for (let i = 0; i < ApiData[z].products[0].services.length; i++) {
    serviceArray.push({
      value: ApiData[z].products[0].services[i].id,
      label: ApiData[z].products[0].services[i].name,
    });
  }
  const formSubmit = (evt) => {
    evt.preventDefault();
    let serviceArrayValue = [];
    let productArrayValue = [];
    for (let x = 0; x < serviceSelect.length; x++) {
      serviceArrayValue.push(serviceSelect[x].value);
    }
    for (let x = 0; x < productSelect.length; x++) {
      productArrayValue.push(productSelect[x].value);
    }
    fetchData(productArrayValue, serviceArrayValue);
  };

  const fetchData = async (productIds = [], servicesIds = []) => {
    var date = new Date();
    date.setDate(date.getDate() - 15);
    let startdate = moment(date).format("YYYY-MM-DD");
    let enddate = moment(new Date()).format("YYYY-MM-DD");
    let productId = productIds.join(",");
    let servicesId = servicesIds.join(",");

    let series = [];
    const url = `${BASE_URL}user/revenue?startDate=${startdate}&endDate=${enddate}&productIds=${productId}&serviceIds=${servicesId}&region=${region}`;
    let fetchCall = await fetch(url, {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
    setLoadingData(false);
    if (fetchCall.status === 200) {
      let resp = await fetchCall.json();
      if (resp.length) {
        setmyState(resp[0].report);
        series = Object.keys(resp[0].report[0]);
        series = series.filter((s) => s !== "date" && s !== "region");
        setSeriesData([]);
        setSeriesData(series);
      } else {
        return toast("No Record Found!!");
      }
    }
  };

  useEffect(() => {
    if (!loadingData) {
      fetchData();
    }
  }, [loadingData]);

  return (
    <>
      <div>{label}</div>
      <form className="form" onSubmit={formSubmit}>
        <div className="multiSelect">
          Products:
          <MultiSelect
            // options={productSelectList}
            options={productArray}
            value={productSelect}
            onChange={setProductSelect}
            labelledBy="Products"
            // disableSearch={true}
            // hasSelectAll={false}
          />
        </div>
        <div className="multiSelect">
          Services:
          <MultiSelect
            options={serviceArray}
            // options={ServiceSelectList}
            value={serviceSelect}
            onChange={setServiceSelect}
            labelledBy="Services"
            // disableSearch={true}
            // hasSelectAll={false}
          />
        </div>
        <div className="header-right">
          {/* <div>
            Start date:
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            End date:
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div> */}
          <Button
            className="button"
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            // disabled={tableShow}
          >
            Submit
          </Button>
        </div>
      </form>
      <Paper className="chartPage">
        {seriesData?.length > 0 && (
          <Chart data={mystate}>
            <ArgumentAxis />
            <ValueAxis max={2400} />
            {seriesData?.map((s, key) => (
              <BarSeries
                name={s}
                valueField={s}
                key={key}
                argumentField="date"
              />
            ))}
            <Animation />
            <Legend
              size="small"
              position="bottom"
              rootComponent={Root}
              labelComponent={Label}
              orientation="horizontal"
            />
            <Title text={`${region} Revenue`} />
            <div className="chartLabel">
              {
                <Stack
                  stacks={[
                    {
                      series: seriesData,
                    },
                  ]}
                />
              }
            </div>
          </Chart>
        )}
      </Paper>
    </>
  );
};
export default ChartBar;
