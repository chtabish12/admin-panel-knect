import React, { useState, useEffect } from "react";
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
}) => {
  const [data, setUser] = useState(currentState);
  const [permission, setPermission] = useState([]);
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

  const handleAttendingChange = () => {};

  useEffect(() => {
    currentState.permission.split(",").map((ele, index) => {
      return apiPermissions.push({ name: ele, id: index + 1 });
    });

    objectsEqual(PERMISSIONS, apiPermissions);
    setPermission(comparedPermissions);
    setUser(currentState);
    // eslint-disable-next-line
  }, [setView, currentState, updateUser]);

  return (
    <div>
      <ShowModel
        show="true"
        setFormShow={setFormShow}
        setView={setView}
        headerTable={headerTable}
      >
        <Form.Group>
          <Form.Label>{headerTable} Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="name"
            value={data.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{headerTable} Email</Form.Label>
          <Form.Control
            type="email"
            placeholder={headerTable}
            name="email"
            value={data.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{headerTable} Password</Form.Label>
          <Form.Control
            type="password"
            placeholder={headerTable}
            name="password"
            value={data.password}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{headerTable} is Admin</Form.Label>
          <Form.Control
            type="number"
            placeholder={headerTable}
            name="isAdmin"
            value={data.isAdmin}
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
      </ShowModel>
    </div>
  );
};

export default AdminUserShow;
