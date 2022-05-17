import React from "react";
import Modal from "react-bootstrap/Modal";
const EditModel = (props) => {
  const handleClose = () => {
    props.setFormShow(false);
    props.setEditing(false);
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
      </Modal>
    </div>
  );
};

export default EditModel;
