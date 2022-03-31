import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import { Button } from "@material-ui/core";
import { LineWave } from "react-loader-spinner";

// components
import { toast } from "react-toastify";
import { NO_DATA } from "../../helper/Helper";
import { useForm } from "react-hook-form";
import { AdminPanelService } from "../../Service/AdminPanelService";
import {
  MAIN_DASHBOARD_STARTDATE,
  OK,
  MAIN_DASHBOARD,
  SUBMIT,
  EXPORT_CSV,
  PLATFORM_REVENUE,
  YOY_GROWTH,
  REGIONAL_REVENUE,
} from "../../Constants";
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
  const [isLoading, setIsLoading] = useState(false);
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
      : MAIN_DASHBOARD_STARTDATE;
    let endDate = FiltersReduxState.endDateSet
      ? FiltersReduxState.endDateSet
      : new Date();
    let region = FiltersReduxState.regionSet ? FiltersReduxState.regionSet : "";
    AdminPanelService.MainDashBoard(
      productIds,
      startDate,
      endDate,
      interval,
      region
    )
      .then((resp) => {
        if (resp.status === 200 && resp.statusText === OK) {
          setGeneralRevenue(resp.data.generalRevenue);
          setOperatorRevenue(resp.data.operatorRevenue);
          setRegionalRevenue(resp.data.regionalRevenue);
          setYoyRevenue(resp.data.yoyRevenue);
          setIsLoading(true);
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
  }, [setIsLoading]);
  return (
    <>
      <Suspense fallback={<div className="spinner"><LineWave/></div>}>
        <PageTitle title={MAIN_DASHBOARD} />
      </Suspense>

      <form className="form" onSubmit={handleSubmit(formSubmit)}>
        <>
          <Suspense fallback={<div className="spinner"><LineWave/></div>}>
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
              {SUBMIT}
            </Button>
          </div>
        </>
      </form>
      <div className="CSV-button-div">
        <a
          className="a-button"
          href="https://docs.google.com/spreadsheets/d/1wahQDms-xeEnsbD2rULXQCtWFjMD380DfDRvq-qIKS4/export?format=xlsx"
          target="_blank"
          rel="noreferrer"
        >
          <button className="btn btn-info csv-button">{EXPORT_CSV}</button>
        </a>
      </div>
      <> </>
      <Grid container spacing={2}>
        {isLoading && (
          <>
            <Grid item xs={12} md={7}>
              <Widget title={PLATFORM_REVENUE} upperTitle>
                <Suspense fallback={<div className="spinner"><LineWave/></div>}>
                  <ApexLineChart generalRevenue={generalRevenue} />
                </Suspense>
              </Widget>
            </Grid>
            <Grid item xs={12} md={5}>
              <Suspense fallback={<div className="spinner"><LineWave/></div>}>
                <PieGraph operatorRevenue={operatorRevenue} />
              </Suspense>
            </Grid>

            <Grid item xs={12} md={6}>
              <Widget title={YOY_GROWTH} upperTitle>
                <ResponsiveContainer width="100%" height={400}>
                  <Suspense fallback={<div className="spinner"><LineWave/></div>}>
                    <BubbleChart yoyRevenue={yoyRevenue} />
                  </Suspense>
                </ResponsiveContainer>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6}>
              <Widget title={REGIONAL_REVENUE} upperTitle>
                <ResponsiveContainer width="100%" height={400}>
                  <Suspense fallback={<div className="spinner"><LineWave/></div>}>
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
