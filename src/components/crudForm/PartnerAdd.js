import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddModel from "../model/AddModel";
import "../../styles.css";

const PartnerAdd = ({ addUser, headerTable, show, setShow }) => {
  const [data, setUser] = useState(0);
  const initialFormState = {
    id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value });
  };

  const handleClose = () => {
    setShow(false);
    setUser(initialFormState);
  };

  return (
    <div>
      <AddModel
        headerTable={headerTable}
        show={show}
        setShow={setShow}
        setUser={setUser}
        initialFormState={initialFormState}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!data.name) return;
            addUser(data);
            setUser(initialFormState);
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
            <Form.Label>
              {headerTable} Phone<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="phone"
              placeholder="0XXXXXXXXX"
              name="phone"
              value={data.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Username<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="name"
              placeholder={"abcXX"}
              name="username"
              value={data.username}
              onChange={handleInputChange}
              required
            />
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

export default PartnerAdd;
