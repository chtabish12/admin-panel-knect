import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import Select from "react-select";
import "../../styles.css";

const UsersAdd = ({ addUser, headerTable, operatorsArray }) => {

  const [data, setUser] = useState(0);
  const [operator, setOperator] = useState(0);
  
  const initialFormState = {
    uuid: "",
    msisdn: "",
    operatorId: "",
    EPTokenNumber: "",
    Email: "",
  };

  const handleInputChange = (event, operator) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value, operator });
  };

  return (
    <div>
      <AddModel headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!data.uuid || !data.msisdn || !operator.value) return;
            addUser(data, operator.value);
            setUser(initialFormState);
          }}
        >
          <Form.Group>
            <Form.Label>{headerTable} uuid</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="uuid"
              value={data.uuid}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} msisdn</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="msisdn"
              value={data.msisdn}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>operatorId</Form.Label>
            <Select
              options={operatorsArray}
              value={operator}
              onChange={setOperator}
              labelledBy="operator"
              placeholder="operator Id"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} EPTokenNumber</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="EPTokenNumber"
              value={data.EPTokenNumber}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={headerTable}
              name="Email"
              value={data.Email}
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

export default UsersAdd;
