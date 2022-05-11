import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import AddModel from "../model/AddModel";
import { toast } from "react-toastify";
import "../../styles.css";

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
            if (!partner) return toast("please select Partner");
            addUser(data, partner.value);
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
              Partner<span className="asteric">*</span>
            </Form.Label>
            <Select
              options={partnersArray}
              value={partner}
              onChange={setPartner}
              labelledBy="Partner"
              placeholder="select partner"
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>store Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="XXXXX"
              name="storeId"
              value={data.storeId}
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

export default ProductAdd;
