import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const AddModel = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="add-product-btn">
        <Button variant="primary" onClick={handleShow}>
          Add new {props.headerTable}
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="model"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new {props.headerTable}</Modal.Title>
        </Modal.Header>
        {props.children}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddModel;
