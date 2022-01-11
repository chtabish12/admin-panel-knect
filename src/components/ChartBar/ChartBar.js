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
import _ from "lodash";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "0",
    padding: "22px",
    fontSize: "0.7rem !important",
  },
  // "Component-root-98": {
  //   height: "120vh !important",
  // },
  // "LegendRoot-root-105": {
  //   flexWrap: "wrap !important",
  //   flexDirection: "column !important",
  //   width: "100% !important",
  //   height: "60vh !important",
  // },
  // "LegendItem-root-109": {
  //   width: "154px !important",
  // },
});
const legendRootBase = ({ classes, ...restProps }) => (
  // console.log(classes) ||
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
const ChartBar = ({  region, label, y, z }) => {
  // local
  const [productSelect, setProductSelect] = useState([]);
  const [serviceSelect, setServiceSelect] = useState([]);
  const [mystate, setmyState] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  let productArray = [];
  const ApiData = JSON.parse(localStorage.getItem("api-data"));
    // for (let i = 0; i < ApiData.length; i++)
    for (let x = 0; x < ApiData[y].products.length; x++) {
      productArray.push({
        value: ApiData[y].products[x].id,
        label: ApiData[y].products[x].name,
      });
  }
    // console.log("Array", productArray)
  let serviceArray = [];
  // for (let x = 0; x < ApiData.length; x++) {
  for (let i = 0; i < ApiData[z].products[0].services.length; i++) {
    serviceArray.push({
      value: ApiData[z].products[0].services[i].id,
      label: ApiData[z].products[0].services[i].name,
    });
  }
  // console.log(ApiData[1].products[0].services[0].id)
  // }
// y++;
  const formSubmit = () => {
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
    let startdate = "2021-12-27";
    // let startdate = moment(new Date().getDate() - 15).format('YYYY-MM-DD');
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
      // console.log(resp[0].report)
      if (resp.length) {
        setmyState(resp[0].report);
        // console.log("my state: ", mystate);
        series = Object.keys(resp[0].report[0]);
        series = series.filter((s) => s !== "date" && s !== "region");
        // console.log("before Series", series);
        setSeriesData([]);
        setSeriesData(series);
        // console.log("After Series", seriesData);
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
            <Title text={`${region} Revenue Chart`} />
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
