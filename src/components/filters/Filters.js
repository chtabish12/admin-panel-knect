import React, { useState } from "react";
import Select from "react-select";
import "../../components/HeatMapTable/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import {
  FilterFunction,
  MainDashBoardFilterMethod,
} from "../../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filters = ({
  HeatmapFilterShow,
  ReportFlag,
  AdminUserFlag,
  ChartBarShow,
  prodIndex,
  servIndex,
  regions,
  MainDashBoardFiltersShow,
}) => {
  // local
  const [serviceSelectValue, setServiceSelectValue] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2018-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [regionSelectValue, setRegionSelectValue] = useState([]);
  const [intervalSelect, setintervalSelect] = useState([]);
  let RegionsArray = [];
  let productArray = [];
  let serviceArray = [];
  const options = [
    { value: "yearly", label: "yearly" },
    { value: "quarter", label: "quartly" },
    // { value: "monthly", label: "monthly" },
  ];
  if (MainDashBoardFiltersShow)
    MainDashBoardFilterMethod(
      regions,
      regionSelectValue,
      productArray,
      RegionsArray,
      productSelect,
      startDate,
      endDate,
      intervalSelect.value
    );
  else
    FilterFunction(
      productArray,
      productSelect,
      serviceArray,
      serviceSelectValue,
      HeatmapFilterShow,
      AdminUserFlag,
      ReportFlag,
      ChartBarShow,
      prodIndex,
      servIndex
    );
  // removing duplicates
  productArray = productArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.label === value.label && t.value === value.value)
  );
  // removing duplicates
  serviceArray = serviceArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.label === value.label && t.value === value.value)
  );

  return (
    <>
      {HeatmapFilterShow && (
        <>
          <div className="multiSelect">
            Products
            <Select
              options={productArray}
              value={productSelect}
              onChange={setProductSelect}
              labelledBy="Services"
            />
          </div>
          <div className="multiSelect">
            Services
            <Select
              options={serviceArray}
              value={serviceSelectValue}
              onChange={setServiceSelectValue}
              labelledBy="Services"
            />
          </div>
        </>
      )}
      <>
        {(ReportFlag || ChartBarShow || AdminUserFlag) && (
          <>
            <div className={ReportFlag || ChartBarShow ?"multiSelect":"multi-select-admin-block"}>
              Products
              <MultiSelect
                options={productArray}
                value={productSelect}
                onChange={setProductSelect}
                labelledBy="Products"
              />
            </div>
            <div className={ReportFlag || ChartBarShow ?"multiSelect":"multi-select-admin-block"}>
              Services
              <MultiSelect
                options={serviceArray}
                value={serviceSelectValue}
                onChange={setServiceSelectValue}
                labelledBy="Services"
              />
            </div>
          </>
        )}
        <>
          {MainDashBoardFiltersShow && (
            <>
              <div className="multiSelect">
                Regions
                <MultiSelect
                  options={RegionsArray}
                  value={regionSelectValue}
                  onChange={setRegionSelectValue}
                  labelledBy="Services"
                />
              </div>
              <div className="multiSelect">
                Products
                <MultiSelect
                  options={productArray}
                  value={productSelect}
                  onChange={setProductSelect}
                  labelledBy="Products"
                />
              </div>

              <div className="multiSelect">
                Interval
                <Select
                  options={options}
                  value={intervalSelect}
                  onChange={setintervalSelect}
                  labelledBy="Interval"
                />
              </div>
              <div className="header-right-reporting">
                <div>
                  Start date
                  <DatePicker
                    className="date-input"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div>
                  End date
                  <DatePicker
                    className="date-input"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </>
          )}
        </>
      </>
    </>
  );
};

export default Filters;
