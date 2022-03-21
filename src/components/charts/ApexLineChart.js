import React from "react";
import ApexCharts from "react-apexcharts";
const _ = require("lodash");

export default function ApexLineChart({ generalRevenue }) {
  let quarterArray = [];
  let quarterDate = [];
  const graphData = [];
  let data = [];
  let cat = [];
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
  if (!generalRevenue[0].quarter) {
    for (let productName in ProductGroupBy) {
      cat.forEach((year) => {
        const yearRevenue = ProductGroupBy[productName].find((yearData) => {
          // eslint-disable-next-line
          if (yearData.year == year) return true;
          else return false;
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
  }

  function checkExits(year, quarter, myArray) {
    for (let obj in myArray) {
      // eslint-disable-next-line
      if (myArray[obj].year == year && myArray[obj].quarter == quarter) {
        return myArray[obj];
      }
    }
  }

  if (generalRevenue[0].quarter) {
    let productArray = [];
    for (let productName in ProductGroupBy) {
      for (let qd in quarterDate) {
        let data = checkExits(
          quarterDate[qd].key,
          quarterDate[qd].keys,
          ProductGroupBy[productName]
        );
        if (!data) {
          let obj = {
            revenue: 0,
            year: parseInt(quarterDate[qd].key),
            quarter: parseInt(quarterDate[qd].keys),
          };
          ProductGroupBy[productName].push(obj);
        }
      }
      productArray.push({
        name: productName,
        value: _.sortBy(
          ProductGroupBy[productName],
          (d) => d.year,
          (d) => d.quarter
        ),
      });
    }

    let finalData = _.sortBy(productArray, "name");
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(finalData)) {
      data = [];
      // eslint-disable-next-line
      value.value.map((i) => data.push(i.revenue.toFixed()));
      graphData.push({
        name: value.name,
        data,
      });
    }
  }

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
