import React, { useState, useEffect, lazy, Suspense } from "react";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
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
const PageTitle = lazy(() => import("../../components/PageTitle/PageTitle.js"));
const HeatMapTable = lazy(() =>
  import("../../components/HeatMapTable/HeatMapTable")
);
const Filters = lazy(() => import("../../components/filters/Filters.js"));

const HeatMap = () => {
  // local
  const classes = useStyles();
  const [affiliateValue, setAffiliateValue] = useState([]);
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // API
  const [affiliatesList, setAffiliatesList] = useState("");
  const [tableShow, setTableShow] = useState(false);
  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  const { handleSubmit } = useForm();
  var ApiData = [];
  let affiliatesArray = [];
  const FiltersDisplay = true;
  const serviceSelectValue = localStorage.getItem("service-data");
  console.log(localStorage.getItem("service-data"))

  const fetchFiltersData = () => {
    AdminPanelService.HeatMapAffiliates().then((resp) => {
      ApiData = resp.data;
      if (resp.status === 200 && resp.data.length) {
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
        return toast("No Data Found!!, Please come later!!");
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
    ).then((resp) => {
      setIsLoading(false);
      if (resp.status === 200 && resp.data.length) {
        let data = JSON.stringify(resp.data);
        data = JSON.parse(data);
        setResponse(data);
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
    if (!isLoading) {
      fetchFiltersData();
    }
  },[]);

  return (
    <>
      <Suspense fallback={<></>}>
        <PageTitle title="Services HeatMap" />
      </Suspense>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className={classes.dashedBorder}>
          <Suspense fallback={<></>}>
            <Filters FiltersDisplay={FiltersDisplay} />
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
            <Suspense fallback={<></>}>
              <HeatMapTable dataShow={tableShow} data={response} />
            </Suspense>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default HeatMap;
