import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const EditModel = (props) => {

  const handleClose = () => {
    props.setFormShow(false);
    props.setEditing(false);
  };

  return (
    <div>
      <div className="add-product-btn">
        {/* <Button variant="primary" onClick={handleShow}>
          Add new {props.headerTable}
        </Button> */}
      </div>
      <Modal show={props.show} onHide={handleClose} className="model">
        <Modal.Header closeButton>
          <Modal.Title>{props.headerTable}</Modal.Title>
        </Modal.Header>
        {props.children}
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setFormShow(false);
              props.setEditing(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditModel;
