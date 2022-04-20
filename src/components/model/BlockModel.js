import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const BlockModel = (props) => {
  const handleClose = () => {
    props.setFormShow(false);
    props.setBlocking(false);
  };

  return (
    <div>
      <div className="add-product-btn"></div>
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
              props.setBlocking(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlockModel;