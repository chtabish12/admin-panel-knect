import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import AddModel from "../model/AddModel";
import "../crudTable/styles.css";

const ProductAdd = ({ addUser, partnersArray, headerTable }) => {
  const [data, setUser] = useState(0);
  const [partner, setPartner] = useState(0);
  const initialFormState = {
    id: null,
    name: "",
    partnerId: partner.value,
    storeId: "",
  };

  const handleInputChange = (event, partner) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value }, partner);
  };

  return (
    <div>
      <AddModel headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!data.name || !partner.value || !data.storeId) return;
            addUser(data, partner.value);
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
            <Form.Label>Partner Id</Form.Label>
            <Select
              options={partnersArray}
              value={partner}
              onChange={setPartner}
              labelledBy="Partner"
              placeholder="Partner Id"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>store Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="store Id"
              name="storeId"
              value={data.storeId}
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

export default ProductAdd;
