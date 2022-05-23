import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddModel from "../model/AddModel";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import "../../styles.css";

const UsersAdd = ({ addUser, headerTable, operatorsArray, show, setShow }) => {
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

  const handleClose = () => {
    setShow(false);
    setUser(initialFormState);
    setOperator(0);
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
            if (!operator) return toast("please select Operator");
            addUser(data, operator.value);
            setUser(initialFormState);
            setOperator(0);
          }}
        >
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} uuid<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"XXXXX-XXXX-XX"}
              name="uuid"
              value={data.uuid}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} msisdn<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"03XXXXXXXX"}
              name="msisdn"
              value={data.msisdn}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              operator<span className="asteric">*</span>
            </Form.Label>
            <Select
              options={operatorsArray}
              value={operator}
              onChange={setOperator}
              labelledBy="operator"
              placeholder="select operator"
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} EPTokenNumber<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"XXXXX"}
              name="EPTokenNumber"
              value={data.EPTokenNumber}
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
              name="Email"
              value={data.Email}
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

export default UsersAdd;
