import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import Select from "react-select";
import "../../styles.css";

const OperatorEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
  countryArray,
}) => {
  const [data, setUser] = useState(currentState);
  const [country, setCountry] = useState(0);
  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser, country, setCountry]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value, country });
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

            updateUser(data.id, data, country.value);
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
            Update {headerTable}
          </button>
        </form>
      </EditModel>
    </div>
  );
};

export default OperatorEdit;
