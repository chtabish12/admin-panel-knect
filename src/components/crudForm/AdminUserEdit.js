import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import { PERMISSIONS } from "../../Constants";
import Checkbox from "@mui/material/Checkbox";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "react-bootstrap";
import "../../styles.css";
import { FormGroup } from "@material-ui/core";
import ListMembers from "./AdminAddPermissions";
import { toast } from "react-toastify";

const AdminUserEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
  checked,
  setChecked,
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
  const [data, setUser] = useState(currentState);
  const [permission, setPermission] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [partners, setPartners] = useState([]);
  const [operators, setOperators] = useState([]);
  const [country, setCountry] = useState([]);
  let permissiondata = [];
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
  let productID = [];
  let serviceID = [];
  let partnersID = [];
  let operatorsID = [];
  let countryID = [];

  const _ = require("lodash");

  useEffect(() => {
    currentState.permission.split(",").map((ele, index) => {
      return apiPermissions.push({ name: ele, id: index + 1 });
    });

    objectsEqual(PERMISSIONS, apiPermissions);
    setPermission(comparedPermissions);
    setUser(currentState);
    if (!checked) {
      setCountry(countriesUserAccessSelect);
      setProducts(productUserAccessSelect);
      setServices(serviceUserAccessSelect);
      setPartners(partnersUserAccessSelect);
      setOperators(operatorsUserAccessSelect);
    }
    // eslint-disable-next-line
  }, [editing, setEditing, currentState, updateUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let permissionArray = permission.filter(
      (attendee) => attendee.status === true
    ); // find anyone who IS going
    permissiondata = permissionArray.map((going) => going.name);
    setUser({ ...data, [name]: value, permissiondata });
  };

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleAttendingChange = (index, state) => {
    const updatedPermissions = permission[index]; // from the state 'permission' apiPermissions, get the correct object for updatedPermissions
    updatedPermissions.status = state; // update the boolean of the attendee to indicate going/true || not/false

    const newPermissions = [...permission]; // make a copy of previous state of permission
    newPermissions[index] = updatedPermissions; // insert/overwrite apiPermissions object of the attendee in question with the new version
    setPermission(newPermissions);
  };

  // /////////////////////////////////////////////
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

  const MultiSelectIdCollect = (array, multiSelect) => {
    for (let x = 0; x < multiSelect.length; x++) {
      array.push(multiSelect[x].value);
    }
  };

  const MultiSelectProductId = (array, multiSelect) => {
    for (let x = 0; x < multiSelect.length; x++) {
      array.push(multiSelect[x].productID);
    }
  };

  return (
    <div>
      <EditModel
        show="true"
        setFormShow={setFormShow}
        setEditing={setEditing}
        headerTable={headerTable}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let permissionArray = permission.filter(
              (attendee) => attendee.status === true
            ); // find anyone who IS going
            permissiondata = permissionArray.map((going) => going.name);
            if (!permissiondata.length) {
              return toast("please add permissions");
            } else {
              MultiSelectProductId(productID, services);
              MultiSelectIdCollect(serviceID, services);
              MultiSelectIdCollect(partnersID, partners);
              MultiSelectIdCollect(operatorsID, operators);
              MultiSelectIdCollect(countryID, country);
              updateUser(
                data.id,
                data,
                permissiondata,
                productID,
                serviceID,
                partnersID,
                operatorsID,
                countryID
              );
            }
          }}
        >
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Name<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"Xyz"}
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Email<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder={"abc@xyz.com"}
              name="email"
              value={data.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Password<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder={"****"}
              name="password"
              value={data.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label style={{ margin: "25px 5px", color: "red" }}>
              Is {headerTable}
            </Form.Label>
            <Checkbox
              checked={checked}
              onChange={handleCheckBoxChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            {!checked && (
              <div className="multi-select-admin-block">
                <div className="multi-select-admin-block">
                  Products<span className="asteric">*</span>
                  <MultiSelect
                    options={productsArray}
                    value={products}
                    onChange={setProducts}
                    labelledBy="Products"
                  />
                </div>
                <div className="multi-select-admin-block">
                  Services<span className="asteric">*</span>
                  <MultiSelect
                    options={servicesArray}
                    value={services}
                    onChange={setServices}
                    labelledBy="Services"
                  />
                </div>
                <div className="multi-select-admin-block">
                  Partners
                  <MultiSelect
                    options={partnersArray}
                    value={partners}
                    onChange={setPartners}
                    labelledBy="Partners"
                  />
                </div>
                <div className="multi-select-admin-block">
                  Operators
                  <MultiSelect
                    options={operatorsArray}
                    value={operators}
                    onChange={setOperators}
                    labelledBy="Operators"
                  />
                </div>
                <div className="multi-select-admin-block">
                  Countries
                  <MultiSelect
                    options={countryArray}
                    value={country}
                    onChange={setCountry}
                    labelledBy="Countries"
                  />
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Permission<span className="asteric">*</span>
            </Form.Label>
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
          <div className="button-footer">
            <Button
              variant="danger"
              onClick={() => {
                setFormShow(false);
                setEditing(false);
                setChecked(true);
              }}
            >
              Close
            </Button>
            <button className="btn btn-primary model-footer">Update</button>
          </div>
        </form>
      </EditModel>
    </div>
  );
};

export default AdminUserEdit;
