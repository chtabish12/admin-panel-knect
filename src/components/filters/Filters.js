import React, { useState } from "react";
import Select from "react-select";
import "../../components/HeatMapTable/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const Filters = ({ FiltersDisplay }) => {
  // local
  const [serviceSelectValue, setServiceSelectValue] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  let serviceArray = [];
  let productArray = [];
  const LoginApiResp = JSON.parse(localStorage.getItem("api-data"));
  localStorage.setItem("service-data", serviceSelectValue.value);
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
            productSelect.value
          ) {
            serviceArray.push({
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
    </>
  );
};
export default Filters;
