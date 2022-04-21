import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { FormGroup } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { MultiSelect } from "react-multi-select-component";
import { PERMISSIONS } from "../../Constants";
import Filters from "../filters/Filters";
import "../crudTable/styles.css";
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
}) => {
  const [data, setUser] = useState(0);

  let permissiondata = [];
  let partnersID = [];
  let operatorsID = [];
  let countryID = [];
  const [permission, setPermission] = useState(PERMISSIONS);
  const [partners, setPartners] = useState([]);
  const [operators, setOperators] = useState([]);
  const [country, setCountry] = useState([]);
  const initialFormState = {
    id: null,
    name: "",
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let permissionArray = permission.filter(
      (attendee) => attendee.status === true
    );
    permissiondata = permissionArray.map((going) => going.name);
    setUser({
      ...data,
      [name]: value,
      permissiondata,
    });
    setChecked(event.target.checked);
  };
  const MultiSelectIdCollect = (array, multiSelect) => {
    for (let x = 0; x < multiSelect.length; x++) {
      array.push(multiSelect[x].value);
    }
  };
  const handleAttendingChange = (index, state) => {
    const updatedPermissions = permission[index]; // from the state 'permission' array, get the correct object for permission
    updatedPermissions.status = state; // update the boolean of the permission to indicate going/true || not/false

    const newPermissions = [...permission]; // make a copy of previous state of permission
    newPermissions[index] = updatedPermissions; // insert/overwrite array object of the permission
    setPermission(newPermissions);
  };
  return (
    <div>
      <AddModel headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            let permissionArray = permission.filter(
              (attendee) => attendee.status === true
            );
            permissiondata = permissionArray.map((going) => going.name);
            event.preventDefault();
            MultiSelectIdCollect(partnersID, partners);
            MultiSelectIdCollect(operatorsID, operators);
            MultiSelectIdCollect(countryID, country);
            if (!data.name || partnersID || operatorsID || countryID) {
              return toast("please verfify input fields");
            }
            addUser(data, permissiondata, partnersID, operatorsID, countryID);
            setUser(initialFormState);
          }}
        >
          <Form.Group>
            <Form.Label>{headerTable} Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={headerTable}
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} Password</Form.Label>
            <Form.Control
              type="password"
              placeholder={headerTable}
              name="password"
              value={data.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ margin: "25px 5px", color: "red" }}>
              Is {headerTable}
            </Form.Label>
            <Checkbox
              checked={checked}
              onChange={handleInputChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            {checked && (
              <div className="multi-select-admin-block">
                <Filters AdminUserFlag="true" />
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
          <Form.Group>
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
          <button className="btn btn-primary model-footer">
            Add new {headerTable}
          </button>
        </form>
      </AddModel>
    </div>
  );
};

export default AdminUserAdd;
