import React from "react";

import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  ArgumentAxis,
  Label,
  Tooltip,
  Export,
} from "devextreme-react/chart";

const BubbleChart = ({ yoyRevenue }) => {
  // console.log(yoyRevenue)
  return (
    <Chart
      id="chart"
      // title={"YoY Growth"}
      onSeriesClick={seriesClick}
      dataSource={yoyRevenue}
    >
      <Tooltip
        enabled={true}
        location="edge"
        customizeTooltip={customizeTooltip}
      />
      <CommonSeriesSettings type="bubble" />
      <ValueAxis title="Revenue">
        <Label customizeText={customizeText} />
      </ValueAxis>
      <ArgumentAxis title="Date">
        <Label customizeText={customizeText} />
      </ArgumentAxis>
      {yoyRevenue?.map((s, key) => (
        <Series
          key={key}
          name={s.productName}
          argumentField={"year"}
          valueField={"revenue"}
          sizeField={"revenue"}
        />
      ))}
        <Legend
          position="outside"
          verticalAlignment="bottom"
          horizontalAlignment="center"
        />
      <Export enabled={true} />
    </Chart>
  );
};

export default BubbleChart;

function customizeTooltip(pointInfo) {
  return {
    text: `${pointInfo.point.data.productName}<br/>Total Revenue: ${pointInfo.valueText}M`};
}

function seriesClick(e) {
  const series = e.target;
  if (series.isVisible()) {
    series.hide();
  } else {
    series.show();
  }
}

function customizeText(e) {
  return `${e.value}`;
}
