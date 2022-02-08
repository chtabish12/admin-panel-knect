import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";
// components
import Widget from "../../components/Widget/Widget.js";
const PageTitle = lazy(() => import("../../components/PageTitle/PageTitle.js"));
const ChartBar = lazy(() => import("../../components/ChartBar/ChartBar.js"));

const Dashboard = (props) => {
  // // Redux
  // console.log("product", props.productID, props.serviceID);
  const classes = useStyles();
  const [response, setResponse] = useState([]);
  var x = 0;
  var z = 0;
  useEffect(() => {
    const regions = JSON.parse(localStorage.getItem("api-data"));
    setResponse([]);
    setResponse(regions);
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        <PageTitle title="Dashboard" />
      </Suspense>
      <Grid item xs={12}>
        <Widget bodyClass={classes.mainChartBody}>
          {response?.length > 0 &&
            response?.map((region, key) => (
              <Suspense key={key} fallback={<></>}>
                <ChartBar
                  region={region.name}
                  key={key}
                  y={x++}
                  z={z++}
                  productID={props.productID}
                  serviceID={props.serviceID}
                />
              </Suspense>
            ))}
        </Widget>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  productID: state.filtersData.productSet,
  serviceID: state.filtersData.serviceSet,
});
export default connect(mapStateToProps)(Dashboard);
