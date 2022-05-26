import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
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
  const [serviceStatus, setServiceStatus] = useState([]);

  useEffect(() => {
    setUser(currentState);
  }, [currentState, blockSerive, blocking, setBlocking]);

  const serviceStatusArray = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
    { value: 3, label: "Suspended Subscription" },
    { value: 4, label: "Suspended Billing" },
  ];

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
            if (!serviceStatus.label)
              return toast("Please select the service status");
            blockSerive(data.id, serviceStatus.value);
          }}
        >
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Block<span className="asteric">*</span>
            </Form.Label>
            <Select
              options={serviceStatusArray}
              value={serviceStatus}
              onChange={setServiceStatus}
              placeholder={
                data.status === 1
                  ? "Active"
                  : data.status === 2
                  ? "Inactive"
                  : data.status === 3
                  ? "Suspended Subscription"
                  : data.status === 4
                  ? "Suspended Billing"
                  : "N/A"
              }
              required
            />
          </Form.Group>
          <div className="button-footer">
            <Button
              variant="danger"
              onClick={() => {
                setFormShow(false);
                setBlocking(false);
              }}
            >
              Close
            </Button>
            <Button type="submit" className="btn btn-primary model-footer">
              Block/UnBlock
            </Button>
          </div>
        </form>
      </BlockModel>
    </div>
  );
};

export default ServiceBlock;
