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
  var x = 0;
  var z = 0;
  useEffect(() => {
    const regions = JSON.parse(localStorage.getItem("api-data"));
    setResponse([]);
    setResponse(regions);
    
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid item xs={12}>
        <Widget bodyClass={classes.mainChartBody}>
          {/* <ResponsiveContainer width="100%" minWidth={500}> */}
          {response.length > 0 &&
            response.map((region, key) => (
              <ChartBar
                region={region.name}
                key={key}
                // productSelectList={productArray}
                // ServiceSelectList={serviceArray}
                y= {x++}
                z= {z++}
              />
            ))}

          {/* </ResponsiveContainer> */}
        </Widget>
      </Grid>
    </>
  );
}
