import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import Select from "react-select";
import { toast } from "react-toastify";
import "../../styles.css";

const OperatorAdd = ({ addUser, headerTable, countryArray }) => {
  const [data, setUser] = useState(0);
  const [country, setCountry] = useState(0);
  const initialFormState = {
    id: null,
    name: "",
    friendlyName: "",
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
            if (!country) return toast("please select Country");
            addUser(data, country.value);
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
              {headerTable} FriendlyName<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Abc"
              name="friendlyName"
              value={data.friendlyName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              Country<span className="asteric">*</span>
            </Form.Label>
            <Select
              options={countryArray}
              value={country}
              onChange={setCountry}
              labelledBy="Country"
              placeholder="select country"
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Code<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"XXXX"}
              name="code"
              value={data.code}
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

export default OperatorAdd;
