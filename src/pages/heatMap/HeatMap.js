import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { LineWave } from "react-loader-spinner";
import moment from "moment";
import Select from "react-select";
//date picker
import DatePicker from "react-datepicker";
// styles
import useStyles from "./styles";
import "../../components/HeatMapTable/styles.css";
import "react-datepicker/dist/react-datepicker.css";
// components
import { AdminPanelService } from "../../Service/AdminPanelService";
import { NO_DATA, WRONG_ATTEMPT } from "../../helper/Helper";
const PageTitle = lazy(() => import("../../components/PageTitle/PageTitle.js"));
const HeatMapTable = lazy(() =>
  import("../../components/HeatMapTable/HeatMapTable")
);
const Filters = lazy(() => import("../../components/filters/Filters.js"));

const HeatMap = () => {
  // Redux
  const serviceSelectValue = useSelector(
    (state) => state.filtersData.serviceSet
  );
  // local
  const classes = useStyles();
  const [affiliateValue, setAffiliateValue] = useState([]);
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // API
  const [affiliatesList, setAffiliatesList] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  let dummyDate = [];
  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  const { handleSubmit } = useForm();
  var ApiData = [];
  let affiliatesArray = [];
  const HeatmapFilterShow = true;

  const fetchFiltersData = () => {
    AdminPanelService.HeatMapAffiliates().then((resp) => {
      ApiData = resp.data;
      if (resp.statusText === "OK" && resp.data.length) {
        // affiliates Array array data for displaying dropdown
        for (let i = 0; i < ApiData.length; i++)
          affiliatesArray.push({
            value: ApiData[i].id,
            label: ApiData[i].sourceName,
          });
        // removing duplicates
        affiliatesArray = affiliatesArray.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) => t.label === value.label && t.value === value.value
            )
        );
        setAffiliatesList(affiliatesArray);
      } else {
        toast(NO_DATA);
        setLoading(false);
      }
    });
  };

  const fetchData = () => {
    let startdate = moment(startDate).format("YYYY-MM-DD");
    let enddate = moment(endDate).format("YYYY-MM-DD");
    AdminPanelService.HeatMapTable(
      `${serviceSelectValue}`,
      `${startdate}`,
      `${enddate}`,
      `${affiliateValue.value}`
    )
      .then((resp) => {
        setIsLoading(false);
        if (resp.statusText === "OK" && resp.data.length) {
          let data = JSON.stringify(resp.data);
          data = JSON.parse(data);
          setResponse(data);
          let currentDate = new Date(data[0].reportDate);
          while (
            currentDate <=
            new Date(new Date().setDate(new Date().getDate() - 1))
          ) {
            dummyDate.push(new Date(currentDate));
            // Use UTC date to prevent problems with time zones and DST
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
          }
          setDateArray(dummyDate);
          setLoading(false);
        } else {
          toast(NO_DATA);
          setLoading(false);
          setTableShow(false);
        }
      })
      .catch(() => {
        toast(WRONG_ATTEMPT);
        setLoading(false);
        setTableShow(false);
      });
  };

  const formSubmit = () => {
    setLoading(true);
    fetchData();
    setTableShow(true);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchFiltersData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <div className="spinner">
            <LineWave />
          </div>
        }
      >
        <PageTitle title="Services HeatMap" />
      </Suspense>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className={classes.dashedBorder}>
          <Suspense
            fallback={
              <div className="spinner">
                <LineWave />
              </div>
            }
          >
            <Filters HeatmapFilterShow={HeatmapFilterShow} />
          </Suspense>
          <div className="multiSelect">
            Affiliates
            <Select
              options={affiliatesList}
              value={affiliateValue}
              onChange={setAffiliateValue}
              labelledBy="Products"
            />
          </div>
          <div className="header-right-heat">
            <div className="start-date">
              Start date
              <DatePicker
                className="date-input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="start-date">
              End date
              <DatePicker
                className="date-input"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>

            <div className="button-Heat">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                disabled={!serviceSelectValue || !affiliateValue.value}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div className={classes.dashedBorder}>
            <Suspense
              fallback={
                <div className="spinner">
                  <LineWave />
                </div>
              }
            >
              <HeatMapTable
                dataShow={tableShow}
                data={response}
                dateArray={dateArray}
                loading={loading}
              />
            </Suspense>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default HeatMap;
