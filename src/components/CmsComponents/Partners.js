import React, { useState, Fragment, lazy, Suspense } from "react";
// import { Link } from "react-router-dom";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { RotatingLines } from "react-loader-spinner";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import EditForm from "../crudForm/PartnerEdit";
import AddForm from "../crudForm/PartnerAdd";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));

const Partners = ({
  headerTable,
  editing,
  formShow,
  initialTableData,
  setInitialTableData,
  setEditing,
  setFormShow,
  page,
  setPage,
  rowCounts,
}) => {
  // Setting state
  const initialFormState = {
    id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      // renderCell: (params) => (
      //   <Link
      //     to={{ pathname: "partnersDetailPage", state: params.id }}
      //     className="table-name-href"
      //   >
      //     {params.value}
      //   </Link>
      // ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>-</span> : rowData.value;
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>-</span> : rowData.value;
      },
    },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
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
  const [show, setShow] = useState(false);
  // CRUD operations
  const addUser = (data) => {
    const request = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      username: data.username,
      password: data.password,
    };
    AdminPanelService.AddPartner(request)
      .then((resp) => {
        toast(resp.data);
        setShow(false);
      })
      .catch((err) => toast("Please Check your fields"));

    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    task.email = updatedUser.email;
    task.phone = updatedUser.phone;
    task.username = updatedUser.username;
    task.password = updatedUser.password;
    AdminPanelService.UpdatePartner(id, task)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => toast("Please Check your fields"));
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
      phone: data.phone,
      username: data.username,
      password: data.password,
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
                  <h5>Edit Partners</h5>
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
          <AddForm
            addUser={addUser}
            headerTable={headerTable}
            show={show}
            setShow={setShow}
          />{" "}
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
              page={page}
              setPage={setPage}
              rowCounts={rowCounts}
            />{" "}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Partners;
