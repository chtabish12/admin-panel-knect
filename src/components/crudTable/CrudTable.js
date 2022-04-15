import React from "react";
import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";
import "./styles.css";
import useStyles from "../../pages/services/styles";

import editicon from "../crudForm/assets/edit.png";
// import trashicon from "../crudForm/assets/trash.png";
import blockicon from "../crudForm/assets/block.png";

const CrudTable = ({ initialTableData, editRow, blockRow, serviceFlag }) => {
  const classes = useStyles();
  return (
    <Table striped bordered hover responsive size="md">
      {serviceFlag && (
        <>
          <thead>
            <tr>
              <th>Id</th>
              <th>Service Name</th>
              <th>Status</th>
              <th>Edit / Block</th>
            </tr>
          </thead>
          <tbody>
            {initialTableData.length > 0 && serviceFlag ? (
              initialTableData.map((state) => {
                let color =
                  state.status === 1
                    ? "#5cb85c"
                    : state.status === 0
                    ? "#d9534f"
                    : state.status === 2
                    ? "#337ab7"
                    : state.status === 3
                    ? "#f0ad4e"
                    : "";
                return (
                  <tr key={state.id}>
                    <td>{state.id}</td>
                    <td>
                      <Link
                        to={{ pathname: "detailPage", state: state.id }}
                        className="table-name-href"
                      >
                        {state.name}
                      </Link>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      <span
                        style={{ backgroundColor: color }}
                        className={classes.tableStatusCode}
                      >
                        {state.status === 1
                          ? "Active"
                          : state.status === 0
                          ? "Inactive"
                          : state.status === 2
                          ? "Suspended Subscription"
                          : state.status === 3
                          ? "Suspended Billing"
                          : "N/A"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          editRow(state);
                        }}
                        className="edit"
                      >
                        <img
                          src={editicon}
                          alt="edit.png"
                          className="edit-delete-block-png"
                        />
                      </button>
                      <button
                        onClick={() => {
                          blockRow(state);
                        }}
                        className="block"
                      >
                        <img
                          src={blockicon}
                          alt="block.png"
                          className="edit-delete-block-png"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} class="text-center">
                  No products
                </td>
              </tr>
            )}
          </tbody>
        </>
      )}
    </Table>
  );
};
export default CrudTable;
