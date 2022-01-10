import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
// import { ResponsiveContainer } from "recharts";

// styles
import useStyles from "./styles";
// components
import Widget from "../../components/Widget/Widget.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import ChartBar from "../../components/ChartBar/ChartBar.js";

export default function Dashboard() {
  const classes = useStyles();
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const regions=JSON.parse(localStorage.getItem("api-data"));
    setResponse([]);
    setResponse(regions);
  }, []);
  let productArray = [];
  const ApiData = JSON.parse(localStorage.getItem("api-data"));

  console.log("Api Response", ApiData)

    for (let i = 0; i < ApiData.length; i++)
    for (let x = 0; x < ApiData[i].products.length; x++) {
    
      productArray.push({
        value: ApiData[i].products[x].id,
        label: ApiData[i].products[x].name,
      });
  }
    console.log("Array", productArray)
  // console.log(productArray);
  // console.log(ApiData[0].products[0].services)
  let serviceArray = [];
  for (let x = 0; x < ApiData.length; x++) {
  for (let i = 0; i < ApiData[0].products[0].services.length; i++) {
    serviceArray.push({
      value: ApiData[0].products[0].services[i].id,
      label: ApiData[0].products[0].services[i].name,
    });
  }
  }

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid item xs={12}>
        <Widget
          bodyClass={classes.mainChartBody}>
          {/* <ResponsiveContainer width="100%" minWidth={500}> */}
            {response.length>0 && response.map((region) => (
              <ChartBar
              label={region.name}
                region={region.name}
                productSelectList={productArray}
                ServiceSelectList={serviceArray}
              />
            ))}
          
          {/* </ResponsiveContainer> */}
        </Widget>
      </Grid>
    </>
  );
}
