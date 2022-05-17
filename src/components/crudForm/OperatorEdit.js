import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import "../../styles.css";

const OperatorEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
  countryArray,
}) => {
  const [data, setUser] = useState(currentState);
  const [country, setCountry] = useState(0);

  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser, country, setCountry]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value, country });
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
            if (!country) return toast("please select Country");
            updateUser(data.id, data, country.value);
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

export default OperatorEdit;
