import React, { useState } from "react";
import Select from "react-select";
import "../../components/HeatMapTable/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";

const Filters = ({ FiltersDisplay, ReportFlag }) => {
  // local
  const [serviceSelectValue, setServiceSelectValue] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  let serviceArray = [];
  let productArray = [];
  const LoginApiResp = JSON.parse(localStorage.getItem("api-data"));

  // Product array data for displaying dropdown
  for (let i = 0; i < LoginApiResp.length; i++)
    for (let x = 0; x < LoginApiResp[i].products.length; x++) {
      productArray.push({
        value: LoginApiResp[i].products[x].id,
        label: LoginApiResp[i].products[x].name,
      });
    } // removing duplicates
  productArray = productArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.label === value.label && t.value === value.value)
  );

  // Service array data for displaying dropdown
  if (productSelect) {
    for (let x = 0; x < LoginApiResp.length; x++) {
      for (let y = 0; y < LoginApiResp[x].products.length; y++)
        for (let i = 0; i < LoginApiResp[x].products[y].services.length; i++) {
          if (
            LoginApiResp[x].products[y].services[i].productId ===
              productSelect.value &&
            FiltersDisplay
          ) {
            serviceArray.push({
              value: LoginApiResp[x].products[y].services[i].id,
              label: LoginApiResp[x].products[y].services[i].name,
            });
          } else if (productSelect.length && ReportFlag)
            for (let j = 0; j < productSelect.length; j++)
              if (
                LoginApiResp[x].products[y].services[i].productId ===
                productSelect[j].value
              ) {
                serviceArray.push({
                  ...serviceArray,
                  value: LoginApiResp[x].products[y].services[i].id,
                  label: LoginApiResp[x].products[y].services[i].name,
                });
              }
        }
    }
    serviceArray = serviceArray.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.label === value.label && t.value === value.value
        )
    );
  }
  if (FiltersDisplay) {
    localStorage.setItem("service-data", serviceSelectValue.value);
  } else if (ReportFlag) {
    let productArrayValue = [];
    let serviceArrayValue = [];
    for (let x = 0; x < productSelect.length; x++) {
      productArrayValue.push(productSelect[x].value);
    }
    for (let x = 0; x < serviceSelectValue.length; x++) {
      serviceArrayValue.push(serviceSelectValue[x].value);
    }
    localStorage.setItem("product-data", productArrayValue.join(","));
    localStorage.setItem("service-data", serviceArrayValue.join(","));
  }

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
