import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import { PERMISSIONS } from "../../Constants";
import "../crudTable/styles.css";
import { FormGroup } from "@material-ui/core";
import ListMembers from "./AdminAddPermissions";

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
            updateUser(data.id, data, permissiondata);
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
            <Form.Label>{headerTable} is Admin</Form.Label>
            <Form.Control
              type="number"
              placeholder={headerTable}
              name="isAdmin"
              value={data.isAdmin}
              onChange={handleInputChange}
            />
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
            Update {headerTable}
          </button>
        </form>
      </EditModel>
    </div>
  );
};

export default AdminUserEdit;
