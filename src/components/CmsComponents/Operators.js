import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import EditForm from "../crudForm/OperatorEdit";
import AddForm from "../crudForm/OperatorAdd";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));

const Operators = ({
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
    friendlyName: "",
    countryId: "",
    code: "",
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={{ pathname: "operatorsDetailPage", state: params.id }}
          className="table-name-href"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "friendlyName",
      headerName: "FriendlyName",
      flex: 1,
    },
    { field: "countryId", headerName: "CountryId", flex: 1 },
    { field: "code", headerName: "Code", flex: 1 },
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

  const [countryArray, setCountryArray] = useState([]);
  const [currentState, setCurrentState] = useState(initialFormState);
  let Countries = [];
  // CRUD operations
  const addUser = (data, countryID) => {
    const request = {
      name: data.name,
      friendlyName: data.friendlyName,
      code: data.code,
      countryId: parseInt(countryID),
    };

    AdminPanelService.AddOperator(request)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => toast(err));

    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
  };

  const updateUser = (id, updatedUser, countryValue) => {
    setEditing(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    task.friendlyName = updatedUser.friendlyName;
    task.code = updatedUser.code;
    task.countryId = countryValue;
    AdminPanelService.UpdateOperator(id, task)
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
      friendlyName: data.friendlyName,
      code: data.code,
      countryId: data.countryId,
    });
  };
  
  useEffect(() => {
    AdminPanelService.AllCountries()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          Countries = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setCountryArray(Countries);
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
                  <h5>Edit Operators</h5>
                    <EditForm
                      editing={editing}
                      setEditing={setEditing}
                      currentState={currentState}
                      updateUser={updateUser}
                      setFormShow={setFormShow}
                      headerTable={headerTable}
                      countryArray={countryArray}
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
              countryArray={countryArray}
            />
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

export default Operators;
