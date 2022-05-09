import React, { useState, Fragment, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { RotatingLines } from "react-loader-spinner";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import EditForm from "../crudForm/CountryEdit";
import AddForm from "../crudForm/CountryAdd";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));
const Country = ({
  headerTable,
  editing,
  formShow,
  initialTableData,
  setInitialTableData,
  setEditing,
  setFormShow,
}) => {
  // Setting state
  const initialFormState = {
    id: null,
    name: "",
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={{ pathname: "countriesDetailPage", state: params.id }}
          className="table-name-href"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "actions",
      type: "number",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <ActionButtons initialTableData={row} editRow={editRow} />
      ),
      flex: 1,
    },
  ];

  const [currentState, setCurrentState] = useState(initialFormState);
  // CRUD operations
  const addUser = (data) => {
    const request = {
      name: data.name,
    };
    AdminPanelService.AddCountry(request)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => toast(err));

    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
    setFormShow(false);
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    AdminPanelService.UpdateCountry(id, task)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => {
        toast(err);
      });
    setFormShow(false);
    setInitialTableData(
      initialTableData.map((data) => (data.id === id ? updatedUser : data))
    );
  };

  const editRow = (data) => {
    setFormShow(true);
    setEditing(true);

    setCurrentState({
      id: data.id,
      name: data.name,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {formShow && (
          <div className="col-12 col-sm-6 mx-auto addUser">
            <Card class="">
              {editing && (
                <Fragment>
                  <h5>Edit Country</h5>
                  <EditForm
                    editing={editing}
                    setEditing={setEditing}
                    currentState={currentState}
                    updateUser={updateUser}
                    setFormShow={setFormShow}
                    headerTable={headerTable}
                  />{" "}
                </Fragment>
              )}
            </Card>
          </div>
        )}
        <Fragment>
          <AddForm addUser={addUser} headerTable={headerTable} />{" "}
        </Fragment>
        <div className="col-12">
          <h5>{headerTable} CMS</h5>
          <Suspense
            fallback={
              <div className="spinner">
                <RotatingLines width="100" strokeColor="#536DFE" />
              </div>
            }
          >
            <TableCRUD
              initialTableData={initialTableData}
              editRow={editRow}
              column={columns}
            />{" "}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Country;
