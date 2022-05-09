import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const ShowModel = (props) => {
  const handleClose = () => {
    props.setFormShow(false);
    props.setView(false);
  };

  return (
    <div>
      <div className="add-product-btn"></div>
      <Modal
        show={props.show}
        onHide={handleClose}
        dialogClassName="model"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.headerTable}</Modal.Title>
        </Modal.Header>
        {props.children}
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setFormShow(false);
              props.setView(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowModel;
