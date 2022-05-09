import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  Title,
  Export,
  Tooltip,
} from "devextreme-react/chart";
import { toast } from "react-toastify";
import moment from "moment";
import Filters from "../filters/Filters.js";
import "./ChartBar.css";
import { AdminPanelService } from "../../Service/AdminPanelService";
import "../../styles.css";
import { NO_DATA } from "../../helper/Helper";
import { RotatingLines } from "react-loader-spinner";

const customizeTooltip = (arg) => {
  return {
    text: `${arg.seriesName} revenue: ${arg.valueText}`,
  };
};

///////////////component
const ChartBar = ({ region, label, y, z }) => {
  // local
  const [myState, setmyState] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);

  const ChartBarShow = true;

  const formSubmit = (evt) => {
    evt.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    var date = new Date();
    date.setDate(date.getDate() - 15);
    let startdate = moment(date).format("YYYY-MM-DD");
    let enddate = moment(new Date()).format("YYYY-MM-DD");
    let productId = localStorage.getItem("product-data")
      ? localStorage.getItem("product-data")
      : "";
    let servicesId = localStorage.getItem("service-data")
      ? localStorage.getItem("service-data")
      : "";

    let series = [];
    setApiLoader(true);

    AdminPanelService.MyRevenue(
      startdate,
      enddate,
      productId,
      servicesId,
      region
    )
      .then((resp) => {
        setLoadingData(false);
        setApiLoader(false);

        if (resp.statusText === "OK" && resp.data.length) {
          setmyState(resp.data[0].report);
          for (let i = 0; i < resp.data[0].report.length; i++)
            series = Object.keys(resp.data[0].report[i]);
          series = series.filter((s) => s !== "date" && s !== "region");
          setSeriesData([]);
          setSeriesData(series);
        } else {
          return toast(NO_DATA);
        }
      })
      .catch(() => toast(NO_DATA));
  };

  useEffect(() => {
    if (!loadingData) {
      fetchData();
    }
    //eslint-disable-next-line
  }, [loadingData]);

  return (
    <>
      <div>{label}</div>
      <form className="form" onSubmit={formSubmit}>
        <Filters ChartBarShow={ChartBarShow} prodIndex={y} servIndex={z} />
        <div className="header-right">
          <Button
            className="button"
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Submit
          </Button>
        </div>
      </form>
      {apiLoader && (
        <div className="spinner">
          <RotatingLines width="100" strokeColor="#536DFE" />
        </div>
      )}
      <Paper className="chartPage">
        {seriesData?.length > 0 && (
          <Chart id="chart" title={`${region} Revenue`} dataSource={myState}>
            <CommonSeriesSettings argumentField="date" type="stackedBar" />
            {seriesData?.map((s, key) => (
              <Series name={s} valueField={s} key={key} />
            ))}
            <ValueAxis position="left">
              <Title text="Revenue" />
            </ValueAxis>
            <Legend
              verticalAlignment="bottom"
              horizontalAlignment="center"
              itemTextPosition="top"
            />
            <Export enabled={true} />
            <Tooltip
              enabled={true}
              location="edge"
              customizeTooltip={customizeTooltip}
            />
          </Chart>
        )}
      </Paper>
      {!seriesData.length && <div className="no-data">{NO_DATA}</div>}
    </>
  );
};
export default ChartBar;
