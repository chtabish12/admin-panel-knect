import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import EditModel from "../model/EditModel";
import "../../styles.css";

const CountryEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
}) => {
  const [data, setUser] = useState(currentState);

  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value });
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

            updateUser(data.id, data);
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
          <div className="button-footer">
            <Button
              variant="danger"
              onClick={() => {
                setFormShow(false);
                setEditing(false);
              }}
            >
              Close
            </Button>
            <button className="btn btn-primary model-footer">Update</button>
          </div>
        </form>
      </EditModel>
    </div>
  );
};

export default CountryEdit;
