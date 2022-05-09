import React, { useState, Fragment, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { RotatingLines } from "react-loader-spinner";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import EditForm from "../crudForm/ProductEdit";
import AddForm from "../crudForm/ProductAdd";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));
const Product = ({
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
    partnerId: "",
    storeId: "",
  };
  const [partnersArray, setPartnersArray] = useState([]);
  const [currentState, setCurrentState] = useState(initialFormState);

  let partners = [];
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={{ pathname: "productDetailPage", state: params.id }}
          className="table-name-href"
        >
          {params.value}
        </Link>
      ),
    },
    { field: "partnerId", headerName: "PartnerId", flex: 1 },
    { field: "storeId", headerName: "StoreId", flex: 1 },
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
  // CRUD operations
  const addUser = (data, partnerID) => {
    const request = {
      name: data.name,
      partnerId: parseInt(partnerID),
      storeId: data.storeId,
    };
    AdminPanelService.AddProducts(request)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => toast(err));

    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
  };

  // const deleteUser = id => {
  //   setEditing(false);

  //   setInitialTableData(initialTableData.filter(data => data.id !== id));
  // };

  const updateUser = (id, updatedUser, partnerValue) => {
    setEditing(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    task.partnerId = partnerValue;
    AdminPanelService.UpdateProducts(id, task)
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
      partnerId: data.partnerId,
    });
  };

  useEffect(() => {
    AdminPanelService.AllPartners()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          partners = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setPartnersArray(partners);
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
                  <h5>Edit Product</h5>
                  <EditForm
                    editing={editing}
                    setEditing={setEditing}
                    currentState={currentState}
                    updateUser={updateUser}
                    setFormShow={setFormShow}
                    partnersArray={partnersArray}
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
            partnersArray={partnersArray}
            headerTable={headerTable}
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
            />{" "}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Product;

//////////////////////////////////////
//           validate={(values) => {
//             const errors = {};
//             if (!values.name) {
//               return (errors.name = "Please, provide product's name");
//             }

//             if (!values.partnerId) {
//               return (errors.partnerId = "Please, provide product's partnerId");
//             }
//           }}
