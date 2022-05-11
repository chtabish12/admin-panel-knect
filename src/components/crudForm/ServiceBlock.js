import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../../styles.css";
import BlockModel from "../model/BlockModel";

const ServiceBlock = ({
  currentState,
  setFormShow,
  headerTable,
  blockSerive,
  blocking,
  setBlocking,
}) => {
  
  const [data, setUser] = useState(currentState);

  useEffect(() => {
    setUser(currentState);
  }, [currentState, blockSerive, blocking, setBlocking]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value });
  };

  return (
    <div>
      <BlockModel
        show="true"
        setFormShow={setFormShow}
        setBlocking={setBlocking}
        headerTable="Block Service"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();

            blockSerive(data.id, data);
          }}
        >
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} Block<span className="asteric">*</span></Form.Label>
            <Form.Control
              type="number"
              placeholder="status"
              name="status"
              value={data.status}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <button className="btn btn btn-danger model-footer">
            Block/UnBlock {headerTable}
          </button>
        </form>
      </BlockModel>
    </div>
  );
};

export default ServiceBlock;
