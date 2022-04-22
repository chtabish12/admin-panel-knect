import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import Select from "react-select";
import "../../styles.css";

const OperatorAdd = ({ addUser, headerTable, countryArray }) => {
  const [data, setUser] = useState(0);
  const [country, setCountry] = useState(0);
  const initialFormState = {
    id: null,
    name: "",
    countryId: "",
    code: "",
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value, country });
  };

  return (
    <div>
      <AddModel headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!data.name || !country.value) return;
            addUser(data, country.value);
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
            <Form.Label>Country Id</Form.Label>
            <Select
              options={countryArray}
              value={country}
              onChange={setCountry}
              labelledBy="Country"
              placeholder="Country Id"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} Code</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="code"
              value={data.code}
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

export default OperatorAdd;
