import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import EditModel from "../model/EditModel";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../styles.css";

const ProductEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  partnersArray,
  headerTable,
}) => {
  const [data, setUser] = useState(currentState);
  const [partner, setPartner] = useState(
    partnersArray.find((obj) => {
      return obj.value === currentState.partnerId;
    })
  );

  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser]);
  // You can tell React to skip applying an effect if certain values havent changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...data, [name]: value, partner });
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
            if (!partner) return toast("please select Partner");
            updateUser(data.id, data, partner.value, partner.label);
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
      </EditModel>{" "}
    </div>
  );
};

export default ProductEdit;
