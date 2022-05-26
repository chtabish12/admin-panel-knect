import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Form } from "react-bootstrap";
import { PERMISSIONS } from "../../Constants";
import "../../styles.css";
import { FormGroup } from "@material-ui/core";
import ListMembers from "./AdminAddPermissions";
import ShowModel from "../model/ShowModel";

const AdminUserShow = ({
  setView,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
  checked,
  productsArray,
  servicesArray,
  partnersArray,
  operatorsArray,
  countryArray,
  userAccess,
  GetSameObjs,
  objectsEqual,
  comparedPermissions,
}) => {
  const _ = require("lodash");
  const [data, setUser] = useState(currentState);
  const [permission, setPermission] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [partners, setPartners] = useState([]);
  const [operators, setOperators] = useState([]);
  const [country, setCountry] = useState([]);
  let apiPermissions = [];
  let productUserAccessArray = [];
  let serviceUserAccessArray = [];
  let partnersUserAccessArray = [];
  let countriesUserAccessArray = [];
  let operatorsUserAccessArray = [];
  let productUserAccessSelect = [];
  let serviceUserAccessSelect = [];
  let partnersUserAccessSelect = [];
  let countriesUserAccessSelect = [];
  let operatorsUserAccessSelect = [];

  const handleAttendingChange = () => {};

  useEffect(() => {
    currentState.permission.split(",").map((ele, index) => {
      return apiPermissions.push({ name: ele, id: index + 1 });
    });
    if (!checked) {
      setCountry(countriesUserAccessSelect);
      setProducts(productUserAccessSelect);
      setServices(serviceUserAccessSelect);
      setPartners(partnersUserAccessSelect);
      setOperators(operatorsUserAccessSelect);
    }
    objectsEqual(PERMISSIONS, apiPermissions);
    setPermission(comparedPermissions);
    setUser(currentState);
    // eslint-disable-next-line
  }, [setView, currentState, updateUser]);

  let productIdGroupBy = _.groupBy(userAccess, "productId");
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(productIdGroupBy)) {
    productUserAccessArray.push({ id: parseInt(key) });
  }
  productUserAccessSelect = GetSameObjs(
    productsArray,
    productUserAccessArray,
    "value",
    "id"
  ).map((ele) => {
    return { label: ele.label, value: ele.value };
  });

  let serviceIdGroupBy = _.groupBy(userAccess, "serviceId");
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(serviceIdGroupBy)) {
    if (key >= 1) serviceUserAccessArray.push({ id: parseInt(key) });
  }
  serviceUserAccessSelect = GetSameObjs(
    servicesArray,
    serviceUserAccessArray,
    "id",
    "id"
  ).map((ele) => {
    return { label: ele.name, value: ele.id, productID: ele.productId };
  });
  servicesArray = GetSameObjs(
    servicesArray,
    products,
    "productId",
    "value"
  ).map((ele) => {
    return { label: ele.name, value: ele.id, productID: ele.productId };
  });

  let partnerIdGroupBy = _.groupBy(userAccess, "partnerId");
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(partnerIdGroupBy)) {
    if (key >= 1) partnersUserAccessArray.push({ id: parseInt(key) });
  }
  partnersUserAccessSelect = GetSameObjs(
    partnersArray,
    partnersUserAccessArray,
    "id",
    "id"
  ).map((ele) => {
    return { label: ele.name, value: ele.id };
  });
  partnersArray = GetSameObjs(partnersArray, products, "partnerId", "id").map(
    (ele) => {
      return { label: ele.name, value: ele.id };
    }
  );

  let operatorsIdGroupBy = _.groupBy(userAccess, "operatorId");
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(operatorsIdGroupBy)) {
    if (key >= 1) operatorsUserAccessArray.push({ id: parseInt(key) });
  }
  operatorsUserAccessSelect = GetSameObjs(
    operatorsArray,
    operatorsUserAccessArray,
    "id",
    "id"
  ).map((ele) => {
    return { label: ele.name, value: ele.id };
  });
  operatorsArray = GetSameObjs(
    operatorsArray,
    services,
    "operatorId",
    "id"
  ).map((ele) => {
    return { label: ele.name, value: ele.id };
  });

  let countryIdGroupBy = _.groupBy(userAccess, "countryId");
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(countryIdGroupBy)) {
    if (key >= 1) countriesUserAccessArray.push({ id: parseInt(key) });
  }
  countriesUserAccessSelect = GetSameObjs(
    countryArray,
    countriesUserAccessArray,
    "id",
    "id"
  ).map((ele) => {
    return { label: ele.name, value: ele.id };
  });
  countryArray = GetSameObjs(countryArray, operators, "id", "value").map(
    (ele) => {
      return { label: ele.name, value: ele.id };
    }
  );

  return (
    <div>
      <ShowModel
        show="true"
        setFormShow={setFormShow}
        setView={setView}
        headerTable={headerTable}
      >
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="name"
            value={data.name}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} Email</Form.Label>
          <Form.Control
            type="email"
            placeholder={headerTable}
            name="email"
            value={data.email}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} Password</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="password"
            value={data.password}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>Is Admin</Form.Label>
          <div>
            {data.isAdmin === 1 ? (
              <span style={{ color: "#008240", fontWeight: "bold" }}>True</span>
            ) : data.isAdmin === 0 ? (
              <span style={{ color: "#E87722", fontWeight: "bold" }}>
                False
              </span>
            ) : (
              <span style={{ color: "#B0B700", fontWeight: "bold" }}>N/A</span>
            )}
          </div>
        </Form.Group>
        <Form.Group className="formgroup-space">
          {!checked && (
            <div className="multi-select-admin-block">
              <div className="multi-select-admin-block">
                Products<span className="asteric">*</span>
                <MultiSelect
                  options={productsArray}
                  value={products}
                  onChange={() => {}}
                  labelledBy="Products"
                />
              </div>
              <div className="multi-select-admin-block">
                Services<span className="asteric">*</span>
                <MultiSelect
                  options={servicesArray}
                  value={services}
                  labelledBy="Services"
                  onChange={() => {}}
                />
              </div>
              <div className="multi-select-admin-block">
                Partners
                <MultiSelect
                  options={partnersArray}
                  value={partners}
                  labelledBy="Partners"
                  onChange={() => {}}
                />
              </div>
              <div className="multi-select-admin-block">
                Operators
                <MultiSelect
                  options={operatorsArray}
                  value={operators}
                  labelledBy="Operators"
                  onChange={() => {}}
                />
              </div>
              <div className="multi-select-admin-block">
                Countries
                <MultiSelect
                  options={countryArray}
                  value={country}
                  labelledBy="Countries"
                  onChange={() => {}}
                />
              </div>
            </div>
          )}
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} Permission</Form.Label>
          <FormGroup>
            {permission.map((permission, i) => {
              return (
                <ListMembers
                  key={i}
                  permission={permission}
                  index={i}
                  handleAttendingChange={handleAttendingChange}
                />
              );
            })}
          </FormGroup>
        </Form.Group>
      </ShowModel>
    </div>
  );
};

export default AdminUserShow;
