import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import { PERMISSIONS } from "../../Constants";
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
}) => {
  const [data, setUser] = useState(currentState);
  const [permission, setPermission] = useState([]);
  let permissiondata = [];
  let apiPermissions = [];
  let comparedPermissions = [];

  const objectsEqual = (o1, o2) => {
    for (let permission of o1) {
      const permisionFound = o2.find((perm) => permission.name === perm.name);
      const permissionObject = {};

      if (permisionFound) {
        permissionObject.name = permisionFound.name;
        permissionObject.id = permisionFound.id;
        permissionObject.status = true;
      } else {
        permissionObject.name = permission.name;
        permissionObject.id = permission.id;
        permissionObject.status = false;
      }
      comparedPermissions.push(permissionObject);
    }
  };

  useEffect(() => {
    currentState.permission.split(",").map((ele, index) => {
      return apiPermissions.push({ name: ele, id: index + 1 });
    });

    objectsEqual(PERMISSIONS, apiPermissions);
    setPermission(comparedPermissions);
    setUser(currentState);
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

  const handleAttendingChange = (index, state) => {
    const updatedPermissions = permission[index]; // from the state 'permission' apiPermissions, get the correct object for updatedPermissions
    updatedPermissions.status = state; // update the boolean of the attendee to indicate going/true || not/false

    const newPermissions = [...permission]; // make a copy of previous state of permission
    newPermissions[index] = updatedPermissions; // insert/overwrite apiPermissions object of the attendee in question with the new version
    setPermission(newPermissions);
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
              updateUser(data.id, data, permissiondata);
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
            <Form.Label>{headerTable} is Admin</Form.Label>
            <Form.Control
              type="number"
              placeholder={headerTable}
              name="isAdmin"
              value={data.isAdmin}
              onChange={handleInputChange}
            />
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
          <button className="btn btn-primary model-footer">
            Update {headerTable}
          </button>
        </form>
      </EditModel>
    </div>
  );
};

export default AdminUserEdit;
