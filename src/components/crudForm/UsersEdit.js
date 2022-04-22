import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import Select from "react-select";
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

            updateUser(data.id, data, operator.value);
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
