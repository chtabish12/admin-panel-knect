import React, { useState } from "react";
import { useTheme } from "@material-ui/styles";
import { Pie, PieChart, Sector } from "recharts";
import Widget from "../Widget/Widget";
import { ResponsiveContainer } from "recharts";

const PieGraph = ({ operatorRevenue }) => {
  var theme = useTheme();

  // local
  var [activeIndex, setActiveIndexId] = useState(0);

  return (
    <>
      <Widget title="Overall Operators Revenue" noBodyPadding upperTitle>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={300} height={300}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={operatorRevenue}
              innerRadius={70}
              outerRadius={110}
              fill={theme.palette.info.main}
              dataKey="revenue"
              onMouseEnter={(e, id) => setActiveIndexId(id)}
            />
          </PieChart>
        </ResponsiveContainer>
      </Widget>
    </>
  );
};
export default PieGraph;

// ################################################################

function renderActiveShape(props) {
  var RADIAN = Math.PI / 180;
  var {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    revenue,
  } = props;
  var sin = Math.sin(-RADIAN * midAngle);
  var cos = Math.cos(-RADIAN * midAngle);
  var sx = cx + (outerRadius + 10) * cos;
  var sy = cy + (outerRadius + 10) * sin;
  var mx = cx + (outerRadius + 30) * cos;
  var my = cy + (outerRadius + 30) * sin;
  var ex = mx + (cos >= 0 ? 1 : -1) * 22;
  var ey = my;
  var textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={6} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${revenue}`}</text>
      <text
        x={ex+30}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
}
