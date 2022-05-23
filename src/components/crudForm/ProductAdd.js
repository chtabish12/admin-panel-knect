import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { Button } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { toast } from "react-toastify";
import "../../styles.css";

const ProductAdd = ({ addUser, partnersArray, headerTable, show, setShow }) => {
  const [data, setUser] = useState(0);
  const [partner, setPartner] = useState(0);

  const initialFormState = {
    id: null,
    name: "",
    partnerId: null,
    storeId: "",
  };

  const handleInputChange = (event, partner) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value }, partner);
  };

  const handleClose = () => {
    setShow(false);
    setUser(initialFormState);
    setPartner(0);
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
            if (!partner) return toast("please select Partner");
            addUser(data, partner.value);
            setUser(initialFormState);
            setPartner(0);
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

export default ProductAdd;
