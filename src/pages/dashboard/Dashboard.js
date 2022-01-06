import React from "react";
import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

// styles
import useStyles from "./styles";
// components
import Widget from "../../components/Widget/Widget.js";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import ChartBar from "../../components/ChartBar/ChartBar.js";

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid item xs={12}>
        <Widget
          bodyClass={classes.mainChartBody}
          // header={
          // }
        >
          <ResponsiveContainer width="100%" minWidth={500}>
            <ChartBar />
          </ResponsiveContainer>
        </Widget>
      </Grid>
    </>
  );
}
