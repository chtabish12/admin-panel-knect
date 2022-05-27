import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { AdminPanelService } from "../../Service/AdminPanelService";
// import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import EditForm from "../crudForm/UsersEdit";
import AddForm from "../crudForm/UsersAdd";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));

const Users = ({
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
  isLoading,
}) => {
  // Setting state
  const initialFormState = {
    id: null,
    uuid: "",
    msisdn: "",
    operatorId: "",
    EPTokenNumber: "",
    Email: "",
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "uuid",
      headerName: "Uuid",
      flex: 1,
      // renderCell: (params) => (
      //   <Link
      //     to={{ pathname: "userDetailPage", state: params.id }}
      //     className="table-name-href"
      //   >
      //     {params.value}
      //   </Link>
      // ),
    },
    { field: "msisdn", headerName: "Msisdn", flex: 1 },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>-</span> : rowData.value;
      },
    },
    {
      field: "operatorId",
      headerName: "OperatorId",
      flex: 1,
      renderCell: (rowData) => {
        return !rowData.value ? <span>-</span> : rowData.value;
      },
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

  const [operatorsArray, setOperatorsArray] = useState([]);
  const [currentState, setCurrentState] = useState(initialFormState);
  const [show, setShow] = useState(false);
  let operators = [];
  // CRUD operations
  const addUser = (data, operatorID) => {
    const request = {
      uuid: data.uuid,
      msisdn: data.msisdn,
      operatorId: parseInt(operatorID),
      EPTokenNumber: data.EPTokenNumber,
      Email: data.Email,
    };

    AdminPanelService.AddUser(request)
      .then((resp) => {
        toast(resp.data);
        setShow(false);
        data.id = initialTableData.length + 1;
        setInitialTableData([...initialTableData, data]);
      })
      .catch((err) => toast("Please Check your fields"));

    setFormShow(false);
  };

  const updateUser = (id, updatedUser, operatorValue) => {
    setEditing(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.uuid = updatedUser.uuid;
    task.msisdn = updatedUser.msisdn;
    task.operatorId = operatorValue;
    task.EPTokenNumber = updatedUser.EPTokenNumber;
    task.Email = updatedUser.Email;
    AdminPanelService.UpdateUser(id, task)
      .then((resp) => {
        toast(resp.data);
        setInitialTableData(
          initialTableData.map((data) => (data.id === id ? updatedUser : data))
        );
      })
      .catch((err) => toast("Please Check your fields"));
    setFormShow(false);
  };

  const editRow = (data) => {
    setFormShow(true);
    setEditing(true);

    setCurrentState({
      id: data.id,
      uuid: data.uuid,
      msisdn: data.msisdn,
      operatorId: data.operatorId,
      EPTokenNumber: data.EPTokenNumber,
      Email: data.Email,
    });
  };

  useEffect(() => {
    AdminPanelService.AllOperators()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          operators = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setOperatorsArray(operators);
        }
      })
      .catch((err) => toast(err));
  }, []);

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
                    operatorsArray={operatorsArray}
                  />{" "}
                </Fragment>
              )}
            </Card>
          </div>
        )}
        <Fragment>
          <AddForm
            addUser={addUser}
            headerTable={headerTable}
            operatorsArray={operatorsArray}
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
              isLoading={isLoading}
            />{" "}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Users;
