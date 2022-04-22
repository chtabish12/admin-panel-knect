import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import EditModel from "../model/EditModel";
import "../../styles.css";

const ProductEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  partnersArray,
  headerTable
}) => {
  const [data, setUser] = useState(currentState);
  const [partner, setPartner] = useState();

  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value, partner });
  };

  return (
    <div>
      <EditModel show="true" setFormShow={setFormShow} setEditing={setEditing} headerTable={headerTable}>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            updateUser(data.id, data, partner.value);
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
          <button className="btn btn-primary model-footer">Update {headerTable}</button>
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

export default ProductEdit;
