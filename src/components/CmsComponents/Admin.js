import React, { useState, Fragment, useEffect, lazy, Suspense } from "react";
import { AdminPanelService } from "../../Service/AdminPanelService";
// import { Link } from "react-router-dom";
import ActionButtons from "../crudForm/ActionButtons";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import EditForm from "../crudForm/AdminUserEdit";
import AddForm from "../crudForm/AdminUserAdd";
import AdminUserShow from "../crudForm/AdminUserShow";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));

const Admin = ({
  headerTable,
  editing,
  view,
  setView,
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
    name: "",
    email: "",
    password: "",
    isAdmin: "",
    permission: "",
  };
  // Define Columns
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      // renderCell: (params) => (
      //   <Link
      //     to={{ pathname: "AdminUserDetailPage", state: params.id }}
      //     className="table-name-href"
      //   >
      //     {params.value}
      //   </Link>
      // ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "isAdmin",
      headerName: "Admin",
      flex: 1,
      renderCell: (rowData) => {
        return rowData.value === 1 ? (
          <span style={{ color: "#008240", fontWeight: "bold" }}>True</span>
        ) : rowData.value === 0 ? (
          <span style={{ color: "#E87722", fontWeight: "bold" }}>False</span>
        ) : (
          <span style={{ color: "#B0B700", fontWeight: "bold" }}>N/A</span>
        );
      },
    },
    {
      field: "actions",
      type: "number",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <ActionButtons
          initialTableData={row}
          editRow={editRow}
          showRow={showRow}
          AdminFlag="true"
        />
      ),
      flex: 1,
    },
  ];
  // Hooks initialization
  const [currentState, setCurrentState] = useState(initialFormState);
  const [checked, setChecked] = useState(true);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [partners, setPartners] = useState([]);
  const [operators, setOperators] = useState([]);
  const [country, setCountry] = useState([]);
  const [show, setShow] = useState(false);
  const [userAccess, setUserAccess] = useState();
  // Arrays initialization
  let productsArray = [];
  let comparedPermissions = [];

  // CRUD operations
  const addUser = (
    data,
    permissiondata,
    productID,
    serviceID,
    partnersID,
    operatorsID,
    countryID
  ) => {
    let adminUserAccessArray = [];
    let loopLength;
    if (!checked) {
      let serviceLength = serviceID.length;
      let operatorLength = partnersID.length;
      let partnerLength = operatorsID.length;
      let countryLength = countryID.length;
      loopLength = Math.max(
        serviceLength,
        operatorLength,
        partnerLength,
        countryLength
      );

      for (let i = 0; i < loopLength; i++) {
        adminUserAccessArray.push({
          productId: productID[i] ? productID[i] : "",
          serviceId: serviceID[i] ? serviceID[i] : "",
          partnerId: partnersID[i] ? partnersID[i] : "",
          operatorId: operatorsID[i] ? operatorsID[i] : "",
          countryId: countryID[i] ? countryID[i] : "",
        });
      }
    }
    const request = {
      name: data.name,
      email: data.email,
      password: data.password,
      isAdmin: checked ? 1 : 0,
      permission: permissiondata.toString(),
      userAccess: adminUserAccessArray,
    };

    AdminPanelService.AddAdminUser(request)
      .then((resp) => {
        toast(resp.data);
        setShow(false);
      })
      .catch((err) => toast("Please Check your fields"));
    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
    setFormShow(false);
  };

  const ProductAll = () => {
    AdminPanelService.Products()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          productsArray = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setProducts(productsArray);
        }
      })
      .catch((err) => toast(err));
  };

  const ServicesAll = () => {
    AdminPanelService.Services()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          setServices(resp.data);
        }
      })
      .catch((err) => toast(err));
  };

  const PartnersAll = () => {
    AdminPanelService.Partners()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          setPartners(resp.data);
        }
      })
      .catch((err) => toast(err));
  };

  const OperatorsAll = () => {
    AdminPanelService.Operators()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          setOperators(resp.data);
        }
      })
      .catch((err) => toast(err));
  };

  const CountriesAll = () => {
    AdminPanelService.Countries()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          setCountry(resp.data);
        }
      })
      .catch((err) => toast(err));
  };

  const updateUser = (
    id,
    updatedUser,
    permissiondata,
    productID,
    serviceID,
    partnersID,
    operatorsID,
    countryID
  ) => {
    setEditing(false);
    let adminUserAccessArray = [];
    let loopLength;
    if (!checked) {
      let serviceLength = serviceID.length;
      let operatorLength = partnersID.length;
      let partnerLength = operatorsID.length;
      let countryLength = countryID.length;
      loopLength = Math.max(
        serviceLength,
        operatorLength,
        partnerLength,
        countryLength
      );

      for (let i = 0; i < loopLength; i++) {
        adminUserAccessArray.push({
          productId: productID[i] ? productID[i] : "",
          serviceId: serviceID[i] ? serviceID[i] : "",
          partnerId: partnersID[i] ? partnersID[i] : "",
          operatorId: operatorsID[i] ? operatorsID[i] : "",
          countryId: countryID[i] ? countryID[i] : "",
        });
      }
    }

    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    task.email = updatedUser.email;
    task.password = updatedUser.password;
    task.isAdmin = checked ? 1 : 0;
    task.permission = permissiondata.toString();
    task.userAccess = adminUserAccessArray;

    AdminPanelService.UpdateAdminUser(id, task)
      .then((resp) => {
        toast("Admin User Successfully Updated!");
      })
      .catch((err) => toast("Please Check your fields"));
    setFormShow(false);
    setInitialTableData(
      initialTableData.map((data) => (data.id === id ? updatedUser : data))
    );
  };

  const getAdminById = (data) => {
    AdminPanelService.GetAdminUserById(data.id)
      .then((resp) => {
        if (resp.statusText === "OK") {
          setCurrentState({
            id: resp.data.id,
            name: resp.data.name,
            email: resp.data.email,
            password: resp.data.password,
            isAdmin: resp.data.isAdmin,
            permission: resp.data.permission,
          });
          setUserAccess(resp.data.userAccess);
          if (data.isAdmin === 1) {
            setChecked(true);
          } else setChecked(false);
        } else {
          toast("no initail data found.");
        }
      })
      .catch((err) => toast(err));
  };

  const editRow = (data) => {
    getAdminById(data);
    setFormShow(true);
    setEditing(true);
  };

  const showRow = (data) => {
    getAdminById(data);
    setFormShow(true);
    setView(true);
  };

  // Admin user permission array methods
  const GetSameObjs = (obj1, obj2, key1, key2) => {
    return obj1.filter(function (o1) {
      return obj2.some(function (o2) {
        return o1[key1] === o2[key2]; // return the ones with equal id
      });
    });
  };

  const objectsEqual = (o1, o2) => {
    for (let permission of o1) {
      const permisionFound = o2.find((perm) => permission.name === perm.name);
      const permissionObject = {};

      if (permisionFound) {
        permissionObject.name = permisionFound.name;
        permissionObject.id = permisionFound.id;
        permissionObject.status = true;
      } else {
        permissionObject.name = permission.name;
        permissionObject.id = permission.id;
        permissionObject.status = false;
      }
      comparedPermissions.push(permissionObject);
    }
  };

  useEffect(() => {
    if (!checked) {
      ProductAll();
      ServicesAll();
      PartnersAll();
      OperatorsAll();
      CountriesAll();
    }
    // eslint-disable-next-line
  }, [checked]);

  return (
    <div className="container-fluid">
      <div className="row">
        {formShow && (
          <div className="col-12 col-sm-6 mx-auto addUser">
            <Card>
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
                    checked={checked}
                    setChecked={setChecked}
                    productsArray={products}
                    servicesArray={services}
                    partnersArray={partners}
                    operatorsArray={operators}
                    countryArray={country}
                    userAccess={userAccess}
                    GetSameObjs={GetSameObjs}
                    objectsEqual={objectsEqual}
                    comparedPermissions={comparedPermissions}
                  />
                </Fragment>
              )}
              {view && (
                <Fragment>
                  <h5>View Admin Users</h5>
                  <AdminUserShow
                    setView={setView}
                    currentState={currentState}
                    setFormShow={setFormShow}
                    headerTable={headerTable}
                    checked={checked}
                    productsArray={products}
                    servicesArray={services}
                    partnersArray={partners}
                    operatorsArray={operators}
                    countryArray={country}
                    userAccess={userAccess}
                    GetSameObjs={GetSameObjs}
                    objectsEqual={objectsEqual}
                    comparedPermissions={comparedPermissions}
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
            checked={checked}
            setChecked={setChecked}
            productsArray={products}
            servicesArray={services}
            partnersArray={partners}
            operatorsArray={operators}
            countryArray={country}
            show={show}
            setShow={setShow}
            GetSameObjs={GetSameObjs}
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
              column={columns}
              page={page}
              setPage={setPage}
              rowCounts={rowCounts}
              isLoading={isLoading}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Admin;
