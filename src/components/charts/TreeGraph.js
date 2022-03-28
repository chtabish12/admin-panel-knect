import React from "react";
import TreeMap, { Tooltip } from "devextreme-react/tree-map";

function TreeGraph({ regionalRevenue }) {
  var _ = require("lodash");
  let showChart = false;
  var grouped = _.groupBy(regionalRevenue, "region");
  const regionalData = [];
  let items = [];
  for (const [key, value] of Object.entries(grouped)) {
    showChart = _.every(value, { revenue: 0 });
    items = [];
    // eslint-disable-next-line
    value.map((ele) =>
      items.push({
        value: ele.revenue,
        name: ele.service,
        country: ele.region,
      })
    );
    regionalData.push({
      name: key,
      items,
    });
  }
  return (
    <>
      {!showChart && (
        <TreeMap id="treemap" dataSource={regionalData}>
          <Tooltip
            enabled={true}
            format="thousands"
            customizeTooltip={customizeTooltip}
          />
        </TreeMap>
      )}
      {showChart && <h4 className="center-text">No Data</h4>}
    </>
  );
}

function customizeTooltip(arg) {
  const { data } = arg.node;
  return {
    text: arg.node.isLeaf()
      ? `<span class="city">${data.name}</span><br/>Revenue: ${arg.valueText}`
      : null,
  };
}

export default TreeGraph;
