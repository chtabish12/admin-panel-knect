import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import "../../styles.css";

const CountryAdd = ({ addUser, headerTable }) => {
  const [data, setUser] = useState(0);
  const initialFormState = {
    id: null,
    name: "",
  };
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
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} Name<span className="asteric">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder={"Xyz"}
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
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

export default CountryAdd;
