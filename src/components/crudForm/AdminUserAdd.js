import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { FormGroup } from "@material-ui/core";
import { PERMISSIONS } from "../../Constants";
import "../crudTable/styles.css";
import ListMembers from "./AdminAddPermissions";

const AdminUserAdd = ({ addUser, headerTable }) => {
  const [data, setUser] = useState(0);
  let permissiondata = [];
  const [permission, setPermission] = useState(PERMISSIONS);
  const initialFormState = {
    id: null,
    name: "",
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let permissionArray = permission.filter(
      (attendee) => attendee.status === true
    ); // find anyone who IS going
    permissiondata = permissionArray.map((going) => going.name);
    setUser({ ...data, [name]: value, permissiondata });
  };

  const handleAttendingChange = (memberIdx, attendanceState) => {
    const updatedAttendee = permission[memberIdx]; // from the state 'permission' array, get the correct object for updatedAttendee
    updatedAttendee.status = attendanceState; // update the boolean of the attendee to indicate going/true || not/false

    const newAttendees = [...permission]; // make a copy of previous state of permission
    newAttendees[memberIdx] = updatedAttendee; // insert/overwrite array object of the attendee in question with the new version
    setPermission(newAttendees);
  };
  return (
    <div>
      <AddModel headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            let permissionArray = permission.filter(
              (attendee) => attendee.status === true
            ); // find anyone who IS going
            permissiondata = permissionArray.map((going) => going.name);
            event.preventDefault();
            if (!data.name) return;
            addUser(data, permissiondata);
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
            {/* <FormLabel component="legend">Select Permissions for the New User</FormLabel> */}
            <FormGroup>
              {permission.map((permission, i) => {
                return (
                  <ListMembers
                    key={i}
                    permission={permission}
                    memberIdx={i}
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
