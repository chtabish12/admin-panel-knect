import React from "react";
import ApexCharts from "react-apexcharts";
const _ = require("lodash");

export default function ApexLineChart({ generalRevenue }) {

  let cat = [];
  let quarterArray = [];
  let quarterDate = [];
  const yearsArray = _.groupBy(generalRevenue, "year");
  const ProductGroupBy = _.groupBy(generalRevenue, "productName");
  //
  if (generalRevenue[0].quarter) {
    for (const [key, value] of Object.entries(yearsArray)) {
      quarterArray = _.groupBy(value, "quarter");
      for (const [keys] of Object.entries(quarterArray))
        quarterDate.push({
          key,
          keys,
        });
    }
    cat = quarterDate.map((ele) => `${ele.key} q${ele.keys}`);
  } else {
    for (const [key] of Object.entries(yearsArray)) {
      cat.push(key);
    }
  }
  let data = [];
  const graphData = [];
  // const sequenceOfYears = [2020, 2021, 2022];
  
  for (let productName in ProductGroupBy) {
    cat.forEach((year) => {
      const yearRevenue = ProductGroupBy[productName].find((yearData) => {
        // eslint-disable-next-line
        if (yearData.year == year && !generalRevenue[0].quarter) return true;
        console.log("testing",yearData.year);
        return false;
        // else if(yearData.year == year && !generalRevenue[0].quarter)
      });
      if (!yearRevenue) {
        ProductGroupBy[productName].push({ revenue: 0, year });
      }
      ProductGroupBy[productName] = _.sortBy(
        ProductGroupBy[productName],
        "year"
      );
    });
  }
  for (const [key, value] of Object.entries(ProductGroupBy)) {
    data = [];

    // eslint-disable-next-line
    value.map((i) => data.push(i.revenue.toFixed()));
    graphData.push({
      name: key,
      data,
    });
  }

  // console.log(ProductGroupBy);
  return (
    <ApexCharts
      options={themeOptions(cat)}
      series={graphData}
      type="area"
      height={380}
    />
  );
}

// ############################################################
function themeOptions(cat) {
  return {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: cat,
    },
    tooltip: {
      x: {
        format: "yy",
      },
    },
    chart: {
      toolbar: {
        show: true,
      },
    },
    legend: {
      show: true,
    },
  };
}
