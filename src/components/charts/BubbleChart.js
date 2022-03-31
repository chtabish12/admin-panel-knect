import React from "react";
import {
  Chart,
  SeriesTemplate,
  CommonSeriesSettings,
  Legend,
  Export,
  Tooltip,
} from "devextreme-react/chart";
const BubbleChart = ({ yoyRevenue }) => {
  // const _ = require("lodash");
  // const group = _.groupBy(yoyRevenue, "year");
  // const total = Object.values(group).reduce(
  //   (previous, current, currentIndex) => {
  //     let obj = {};
  //     let temp = {};
  //     const pp = previous.map((ele) => {
  //       current.map((tt) => {
  //         if (tt.productName == ele.productName) {
  //           // console.log("pre", ele.revenue)
  //           // console.log("curr", tt.revenue)
  //           temp = {
  //             revenue: ele.revenue,
  //             year: ele.year,
  //             productName: ele.productName,
  //             growth: `${
  //               tt.revenue ? tt.revenue : 1 / ele.revenue ? ele.revenue : 1
  //             }%`,
  //             scale:
  //               ele === 0
  //                 ? "up"
  //                 : tt === 0
  //                 ? "down"
  //                 : ele.revenue > tt.revenue
  //                 ? "down"
  //                 : "up",
  //           };
  //           obj = { ...obj, temp };
  //         }
  //       });
  //       if (currentIndex == 1) {
  //         temp = {
  //           revenue: ele.revenue,
  //           year: ele.year,
  //           productName: ele.productName,
  //           growth: "100%",
  //           scale: "up",
  //         };
  //         obj = { ...obj, temp };
  //       }
  //       return obj;
  //     });
  //     console.log("====", pp);
  //     return current;
  //   }
  // );
  // console.log("data", total);
  return (
    <>
      <Chart id="chart" dataSource={yoyRevenue}>
        <CommonSeriesSettings
          argumentField="year"
          valueField="revenue"
          // type="stackedBar"
          ignoreEmptyPoints={true}
          barPadding={60}
        />
        <SeriesTemplate nameField="productName" />
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="center"
        />
        <Export enabled={true} />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
      </Chart>
    </>
  );
};

export default BubbleChart;
const customizeTooltip = (arg, i) => {
  // console.log(arg)
  let revenue = Math.round(arg.valueText);
  // let prevYearPercentage = 0
  // if(i !==0 ){

  // }
  return {
    text: `${arg.seriesName} \n revenue: ${revenue} \n year: ${arg.argument}`,
  };
};
