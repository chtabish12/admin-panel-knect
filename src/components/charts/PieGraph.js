import React from "react";
import PieChart, {
  Series,
  Label,
  Margin,
  Export,
  Legend,
  Animation,
} from "devextreme-react/pie-chart";
import Widget from "../Widget/Widget";
import { OVERALL_OPERATOR_REVENUE } from "../../Constants";
const PieGraph = ({ operatorRevenue }) => {
  return (
    <>
      <Widget title={OVERALL_OPERATOR_REVENUE} noBodyPadding upperTitle>
        <PieChart
          id="pie"
          dataSource={operatorRevenue}
          palette="Bright"
          resolveLabelOverlapping="shift"
        >
          <Series argumentField="name" valueField="revenue">
            <Label visible={true} customizeText={formatText} />
          </Series>
          <Margin bottom={20} />
          <Export enabled={true} />
          <Legend visible={false} />
          <Animation enabled={false} />
        </PieChart>
      </Widget>
    </>
  );
};
export default PieGraph;

// ################################################################
function formatText(arg) {
  let revenue = Number(arg.valueText).toFixed(1);
  let percent = Number(arg.percent).toFixed(3);
  return `${arg.argumentText} \n Revenue: ${revenue} \n ${percent * 100}%`;
}
