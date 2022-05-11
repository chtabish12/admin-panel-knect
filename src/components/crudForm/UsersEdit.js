import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import Select from "react-select";
import { toast } from "react-toastify";
import "../../styles.css";

const UsersEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
  operatorsArray,
}) => {
  const [data, setUser] = useState(currentState);
  const [operator, setOperator] = useState();

  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value, operator });
  };

  return (
    <div>
      <EditModel
        show="true"
        setFormShow={setFormShow}
        setEditing={setEditing}
        headerTable="Edit Service"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!operator) return toast("please select Operator");
            updateUser(data.id, data, operator.value);
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
          <button className="btn btn-primary model-footer">
            Update {headerTable}
          </button>
          {/* <button
            onClick={() => {
              setEditing(false);
              setFormShow(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button> */}
        </form>
      </EditModel>{" "}
    </div>
  );
};

export default UsersEdit;
