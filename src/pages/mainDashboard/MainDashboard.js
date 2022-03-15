import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import { Button } from "@material-ui/core";
// components
import { toast } from "react-toastify";
import { NO_DATA } from "../../helper/Helper";
import { useForm } from "react-hook-form";
import { AdminPanelService } from "../../Service/AdminPanelService";
import Widget from "../../components/Widget/Widget";
import "../../styles.css";
const ApexLineChart = lazy(() =>
  import("../../components/charts/ApexLineChart")
);
const BubbleChart = lazy(() => import("../../components/charts/BubbleChart"));
const PieGraph = lazy(() => import("../../components/charts/PieGraph"));
const TreeGraph = lazy(() => import("../../components/charts/TreeGraph"));
const Filters = lazy(() => import("../../components/filters/Filters"));
const PageTitle = lazy(() => import("../../components/PageTitle/PageTitle.js"));

const MainDashboard = () => {
  const [generalRevenue, setGeneralRevenue] = useState();
  const [operatorRevenue, setOperatorRevenue] = useState();
  const [regionalRevenue, setRegionalRevenue] = useState();
  const [yoyRevenue, setYoyRevenue] = useState();
  const MainDashBoardFiltersShow = true;
  const regions = JSON.parse(localStorage.getItem("api-data"));
  const FiltersReduxState = useSelector((state) => state.filtersData);

  const { handleSubmit } = useForm();
  const fetchData = async () => {
    let interval = FiltersReduxState.intervalSet
      ? FiltersReduxState.intervalSet
      : "";
    let productIds = FiltersReduxState.productSet
      ? FiltersReduxState.productSet
      : "";
    let startDate = FiltersReduxState.startDateSet
      ? FiltersReduxState.startDateSet
      : "2018-01-01";
    let endDate = FiltersReduxState.endDateSet
      ? FiltersReduxState.endDateSet
      : "2022-02-30";
    let region = FiltersReduxState.regionSet ? FiltersReduxState.regionSet : "";
    AdminPanelService.MainDashBoard(
      productIds,
      startDate,
      endDate,
      interval,
      region
    )
      .then((resp) => {
        if (resp.status === 200 && resp.statusText === "OK") {
          setGeneralRevenue(resp.data.generalRevenue);
          setOperatorRevenue(resp.data.operatorRevenue);
          setRegionalRevenue(resp.data.regionalRevenue);
          setYoyRevenue(resp.data.yoyRevenue);
        } else {
          return toast(NO_DATA);
        }
      })
      .catch(() => toast(NO_DATA));
  };
  const formSubmit = async () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Suspense fallback={<></>}>
        <PageTitle title="Main Dashboard" />
      </Suspense>

      <form className="form" onSubmit={handleSubmit(formSubmit)}>
        <>
          <Suspense fallback={<></>}>
            <Filters
              regions={regions}
              MainDashBoardFiltersShow={MainDashBoardFiltersShow}
            />
          </Suspense>
          <div className="button-reporting">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
            >
              Submit
            </Button>
          </div>
        </>
      </form>
      <div className="CSV-button-div">
        <a
          className="a-button"
          href="https://docs.google.com/spreadsheets/d/1MBJwUpnf6PcUgTkXM0Wl07vtAhOZ7mm4/export?format=xlsx"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="contained" color="secondary" size="medium">
            Export CSV
          </Button>
        </a>
      </div>
      <> </>
      <Grid container spacing={2}>
        {generalRevenue && (
          <>
            <Grid item xs={12} md={6}>
              <Widget title="Platform Revenue" upperTitle>
                <Suspense fallback={<></>}>
                  <ApexLineChart generalRevenue={generalRevenue} />
                </Suspense>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Suspense fallback={<></>}>
                <PieGraph operatorRevenue={operatorRevenue} />
              </Suspense>
            </Grid>

            <Grid item xs={12} md={6}>
              <Widget noBodyPadding title="YoY Growth" upperTitle>
                <ResponsiveContainer width="100%" height={400}>
                  <Suspense fallback={<></>}>
                    <BubbleChart yoyRevenue={yoyRevenue} />
                  </Suspense>
                </ResponsiveContainer>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget noBodyPadding title="Regional Revenue" upperTitle>
                <ResponsiveContainer width="100%" height={400}>
                  <Suspense fallback={<></>}>
                    <TreeGraph
                      stackBar={"bar"}
                      regionalRevenue={regionalRevenue}
                    />
                  </Suspense>
                </ResponsiveContainer>
              </Widget>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default MainDashboard;
