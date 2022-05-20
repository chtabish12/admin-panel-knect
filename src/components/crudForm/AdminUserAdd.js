import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { FormGroup } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { MultiSelect } from "react-multi-select-component";
import { PERMISSIONS } from "../../Constants";
import { Button } from "react-bootstrap";
import "../../styles.css";
import ListMembers from "./AdminAddPermissions";
import { toast } from "react-toastify";

const AdminUserAdd = ({
  addUser,
  headerTable,
  checked,
  setChecked,
  partnersArray,
  operatorsArray,
  countryArray,
  show,
  setShow,
  productsArray,
  servicesArray,
}) => {
  let permissiondata = [];
  let productID = [];
  let serviceID = [];
  let partnersID = [];
  let operatorsID = [];
  let countryID = [];
  const [data, setUser] = useState(0);
  const [permission, setPermission] = useState(PERMISSIONS);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [partners, setPartners] = useState([]);
  const [operators, setOperators] = useState([]);
  const [country, setCountry] = useState([]);

  const initialFormState = {
    id: null,
    name: "",
    email: "",
    password: "",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let permissionArray = permission.filter(
      (attendee) => attendee.status === true
    );
    if (!permissiondata) {
      return toast("please verfify input fields");
    } else permissiondata = permissionArray.map((going) => going.name);
    setUser({
      ...data,
      [name]: value,
      permissiondata,
    });
    // setChecked(event.target.checked);
  };

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
  };

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

  const handleAttendingChange = (index, state) => {
    const updatedPermissions = permission[index]; // from the state 'permission' array, get the correct object for permission
    updatedPermissions.status = state; // update the boolean of the permission to indicate going/true || not/false

    const newPermissions = [...permission]; // make a copy of previous state of permission
    newPermissions[index] = updatedPermissions; // insert/overwrite array object of the permission
    setPermission(newPermissions);
  };

  const handleClose = () => {
    setShow(false);
    setUser(initialFormState);
    // setPermission(PERMISSIONS)
    setProducts([]);
    setServices([]);
    setPartners([]);
    setOperators([]);
    setCountry([]);
    setChecked(true);
  };

  const GetSameObjs = (obj1, obj2, key1, key2) => {
    return obj1.filter(function (o1) {
      return obj2.some(function (o2) {
        return o1[key1] === o2[key2]; // return the ones with equal id
      });
    });
  };

  servicesArray = GetSameObjs(
    servicesArray,
    products,
    "productId",
    "value"
  ).map((ele) => {
    return { label: ele.name, value: ele.id, productID: ele.productId };
  });

  partnersArray = GetSameObjs(partnersArray, products, "partnerId", "id").map(
    (ele) => {
      return { label: ele.name, value: ele.id };
    }
  );

  operatorsArray = GetSameObjs(
    operatorsArray,
    services,
    "operatorId",
    "id"
  ).map((ele) => {
    return { label: ele.name, value: ele.id };
  });

  countryArray = GetSameObjs(countryArray, operators, "countryId", "id").map(
    (ele) => {
      return { label: ele.name, value: ele.id };
    }
  );

  return (
    <div>
      <AddModel headerTable={headerTable} show={show} setShow={setShow}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let permissionArray = permission.filter(
              (attendee) => attendee.status === true
            );
            permissiondata = permissionArray.map((going) => going.name);
            MultiSelectProductId(productID, services);
            MultiSelectIdCollect(serviceID, services);
            MultiSelectIdCollect(partnersID, partners);
            MultiSelectIdCollect(operatorsID, operators);
            MultiSelectIdCollect(countryID, country);
            if (!permissiondata.length) {
              return toast("please add permissions");
            }
            if (!checked) {
              if (!services.length) {
                return toast("please select Services");
              }
              if (!products.length) {
                return toast("please select Products");
              }
            } else {
              addUser(
                data,
                permissiondata,
                productID,
                serviceID,
                partnersID,
                operatorsID,
                countryID
              );
              setUser(initialFormState);
              // setPermission(PERMISSIONS)
              setProducts([]);
              setServices([]);
              setPartners([]);
              setOperators([]);
              setCountry([]);
              setChecked(true);
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
                    labelledBy="Partners"
                  />
                </div>
                <div className="multi-select-admin-block">
                  Services<span className="asteric">*</span>
                  <MultiSelect
                    options={servicesArray}
                    value={services}
                    onChange={setServices}
                    labelledBy="Partners"
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
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              className="btn btn-primary model-footer"
              style={{ width: "70px" }}
            >
              Add
            </Button>
          </div>
        </form>
      </AddModel>
    </div>
  );
};

export default AdminUserAdd;
