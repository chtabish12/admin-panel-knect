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
  const _ = require("lodash");
  const group = _.groupBy(yoyRevenue, "year");
  let data = [];
  Object.values(group).reduce((previous, current, currentIndex) => {
    if (currentIndex === 1) {
      // eslint-disable-next-line
      previous.map((ele) => {
        data.push({
          revenue: ele.revenue,
          year: ele.year,
          productName: ele.productName,
          growth: "100%",
          scale: "up",
        });
      });
    }
    // eslint-disable-next-line
    previous.map((ele) => {
      // eslint-disable-next-line
      current.map((tt) => {
        if (ele.productName === tt.productName) {
          data.push({
            revenue: tt.revenue,
            year: tt.year,
            productName: tt.productName,
            growth: `${(
              ((tt.revenue ? tt.revenue : 1) /
                (ele.revenue ? ele.revenue : 1)) *
              100
            ).toFixed(2)}%`,
            scale:
              ele.revenue === 0
                ? "up"
                : tt.revenue === 0
                ? "down"
                : ele.revenue > tt.revenue
                ? "down"
                : "up",
          });
        } else if (ele.productName !== tt.productName) {
          data.push({
            revenue: ele.revenue,
            year: ele.year,
            productName: ele.productName,
            growth: "100%",
            scale: "up",
          });
        }
        //  else{
        //     dummy.push({
        //       revenue: tt.revenue,
        //       year: tt.year,
        //       productName: tt.productName,
        //       growth: "100%",
        //       scale: "up",
        //     });
        //     console.log(tt.productName !== ele.productName)
        // }
      });
    });
    return current;
  });
  // console.log("before", yoyRevenue);
  data = data.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => t.productName === value.productName && t.year === value.year
      )
  );
  // console.log("after", data);
  return (
    <>
      <Chart id="chart" dataSource={data}>
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
const customizeTooltip = (arg) => {
  let revenue = Math.round(arg.valueText);
  return {
    text: `${arg.seriesName} \n year: ${arg.argument} \n revenue: ${revenue} \n growth: ${arg.point.data.growth} \n scale: ${arg.point.data.scale}`,
  };
};
