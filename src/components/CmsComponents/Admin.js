import React, { useState, Fragment } from "react";
import { AdminPanelService } from "../../Service/AdminPanelService";
import TableCRUD from "../crudTable/TableCRUD";
import EditForm from "../crudForm/AdminUserEdit";
import AddForm from "../crudForm/AdminUserAdd";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
const Admin = ({
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
    email: "",
    password: "",
    isAdmin: "",
    permission: "",
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "isAdmin", headerName: "Admin", flex: 1 },
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
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
      permission: data.permission,
    };
    console.log(request)
    AdminPanelService.AddAdminUser(request)
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
    task.email = updatedUser.email;
    task.password = updatedUser.password;
    task.isAdmin = updatedUser.isAdmin;
    task.permission = updatedUser.permission;
    AdminPanelService.UpdateAdminUser(id, task)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => {
        toast(err);
      });
    // console.log(id, task)
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
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
      permission: data.permission,
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
                  <h5>Edit Admin Users</h5>
                  <EditForm
                    editing={editing}
                    setEditing={setEditing}
                    currentState={currentState}
                    updateUser={updateUser}
                    setFormShow={setFormShow}
                    headerTable={headerTable}
                  />
                </Fragment>
              )}
            </Card>
          </div>
        )}
        <Fragment>
          <AddForm addUser={addUser} headerTable={headerTable} />
        </Fragment>
        <div className="col-12">
          <h5>{headerTable} CMS</h5>
          <TableCRUD
            initialTableData={initialTableData}
            editRow={editRow}
            column={columns}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
