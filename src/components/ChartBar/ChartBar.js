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
import '../../styles.css'

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "0",
    padding: "22px",
    // flexWrap: "wrap !important",
    // flexDirection: "column !important",
    // height: "15vh !important",
    fontSize: "0.7rem !important",
    // width: "40%",

    // display: 'flex',
    // margin: 'auto',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // position : 'absolute'
  },

//   "Component-root-98": {
//     height: "100vh !important"
// },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    // whiteSpace: "nowrap",
    fontSize: "0.4rem !important"
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

///////////////component
const ChartBar = () => {
  // local
  const [productSelect, setProductSelect] = useState([]);
  const [serviceSelect, setServiceSelect] = useState([]);
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  // API
  const [mystate, setmyState] = useState([]);
  // const { handleSubmit } = useForm();
  const [seriesData, setSeriesData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

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
    let startdate = "2021-12-22";
    // let startdate = moment(new Date().getDate() - 15).format('YYYY-MM-DD');
    let enddate = moment(new Date()).format("YYYY-MM-DD");
    let productId = productIds.join(",");
    let servicesId = servicesIds.join(",");

    let series = [];
    const url = `${BASE_URL}user/revenue?startDate=${startdate}&endDate=${enddate}&productIds=${productId}&serviceIds=${servicesId}`;

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
        setmyState(resp);
        // console.log("my state: ", mystate);
        series = Object.keys(resp[0]);
        series = series.filter((s) => s !== "date");
        // console.log("before Series", typeof series);
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
      <form className="form" onSubmit={formSubmit}>
        <div className="multiSelect">
          Products:
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
          Services:
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
                // style=
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
            <Title text="Revenue Chart" />
            <div className="chartLabel">
              {
                <Stack
                  stacks={[
                    // { series: ["Fight Club", "Gago Zain KW Daily", "Gago Telenor Weekly", "Gago Mobily KSA Daily", "Gago Mobily KSA Weekly"] },
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
