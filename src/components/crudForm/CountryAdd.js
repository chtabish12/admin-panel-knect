import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { Button } from "react-bootstrap";
import "../../styles.css";

const CountryAdd = ({ addUser, headerTable, show, setShow }) => {
  const [data, setUser] = useState(0);
  const initialFormState = {
    id: null,
    name: "",
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

export default CountryAdd;
