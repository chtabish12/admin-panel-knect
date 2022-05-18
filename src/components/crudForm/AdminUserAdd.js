import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { FormGroup } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { MultiSelect } from "react-multi-select-component";
import { PERMISSIONS } from "../../Constants";
import Filters from "../filters/Filters";
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

  const handleAttendingChange = (index, state) => {
    const updatedPermissions = permission[index]; // from the state 'permission' array, get the correct object for permission
    updatedPermissions.status = state; // update the boolean of the permission to indicate going/true || not/false

    const newPermissions = [...permission]; // make a copy of previous state of permission
    newPermissions[index] = updatedPermissions; // insert/overwrite array object of the permission
    setPermission(newPermissions);
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <AddModel headerTable={headerTable} show={show} setShow={setShow}>
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
            if (!permissiondata.length) {
              return toast("please add permissions");
            } else {
              addUser(data, permissiondata, partnersID, operatorsID, countryID);
              setUser(initialFormState);
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
            <Button type="submit" className="btn btn-primary model-footer"  style={{width:"70px"}}>Add</Button>
          </div>
        </form>
      </AddModel>
    </div>
  );
};

export default AdminUserAdd;
