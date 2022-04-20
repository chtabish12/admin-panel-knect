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
  let array = [];
  let dummy = [];
  const objectsEqual = (o1, o2) =>
    Object.keys(o1).length === Object.keys(o2).length &&
    Object.keys(o1).every((p) => o1[p] === o2[p]);

  console.log(permission);

  useEffect(() => {
    currentState.permission.split(",").map((ele, index) => {
      return array.push({ name: ele, id: index + 1 });
    });
    PERMISSIONS.map((perm, i) => {
      if (objectsEqual(perm, array[i])) {
        return dummy.push({ name: perm.name, id: perm.id, status: true });
      } else {
        return dummy.push({ name: perm.name, id: perm.id, status: false });
      }
    });
    console.log("final array", dummy);
    setPermission(dummy);
    setUser(currentState);
    // eslint-disable-next-line
  }, [editing, setEditing, currentState, updateUser]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

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
            Update {headerTable}
          </button>
        </form>
      </EditModel>
    </div>
  );
};

export default AdminUserEdit;
