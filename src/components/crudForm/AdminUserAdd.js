import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { PERMISSIONS, BASE_URL } from "../../Constants";
import "../crudTable/styles.css";


const AdminUserAdd = ({ addUser, headerTable }) => {
  const [data, setUser] = useState(0);
  const [permission, setPermission] = useState(PERMISSIONS.split(","));
  const initialFormState = {
    id: null,
    name: "",
  };

  console.log(permission)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value });
  };

  return (
    <div>
      <AddModel headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!data.name) return;
            addUser(data);
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
            <input
              type="text"
              placeholder={headerTable}
              name="permission"
              value={data.permission}
              onChange={handleInputChange}
            />
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
