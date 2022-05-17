import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const AddModel = (props) => {
  const handleShow = () => props.setShow(true);
  const handleClose = () => props.setShow(false);

  return (
    <div>
      <div className="add-product-btn">
        <Button variant="primary" onClick={handleShow}>
          Add new {props.headerTable}
        </Button>
      </div>
      <Modal
        show={props.show}
        onHide={handleClose}
        dialogClassName="model"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new {props.headerTable}</Modal.Title>
        </Modal.Header>
        {props.children}
      </Modal>
    </div>
  );
};

export default AddModel;
