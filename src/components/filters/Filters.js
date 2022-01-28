import React, { useState } from "react";
import Select from "react-select";
import "../../components/HeatMapTable/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import { FilterFunction } from "../../context/UserContext";

const Filters = ({ FiltersDisplay, ReportFlag }) => {
  // local
  const [serviceSelectValue, setServiceSelectValue] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  let serviceArray = [];
  let productArray = [];
  FilterFunction(
    productArray,
    productSelect,
    serviceArray,
    serviceSelectValue,
    FiltersDisplay,
    ReportFlag
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
      {FiltersDisplay && (
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
        {ReportFlag && (
          <>
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
      </>
    </>
  );
};
export default Filters;
