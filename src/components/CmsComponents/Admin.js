import React, { useState, Fragment, useEffect, lazy, Suspense } from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminPanelService } from "../../Service/AdminPanelService";
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
      // cellClassName: (params) => {
      //   console.log(params);
      //   if (params.value == null) {
      //     return "";
      //   }
      //   let color =
      //     params.value === 1
      //       ? "#5cb85c"
      //       : params.value === 0
      //       ? "#d9534f"
      //       : params.value === 2
      //       ? "#337ab7"
      //       : params.value == null
      //       ? "#f0ad4e"
      //       : "";
      //   return (
      //     <span
      //       style={{ backgroundColor: color }}
      //       className={"tableStatusCode"}
      //     >
      //       {params.value === 1
      //         ? "Active"
      //         : params.value === 0
      //         ? "Inactive"
      //         : params.value === 2
      //         ? "Suspended Subscription"
      //         : params.value === 3
      //         ? "Suspended Billing"
      //         : "N/A"}
      //     </span>
      //   );
      //   // return clsx("super-app", {
      //   //   negative: params.value < 0,
      //   //   positive: params.value > 0,
      //   // });
      // },
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
  const [checked, setChecked] = useState(false);
  const [partners, setPartners] = useState([]);
  const [operators, setOperators] = useState([]);
  const [country, setCountry] = useState([]);
  // Arrays initialization
  let partnersArray = [];
  let operatorsArray = [];
  let countryArray = [];
  // Redux
  let productID = useSelector((state) => state.filtersData.productSet);
  let serviceID = useSelector((state) => state.filtersData.serviceSet);
  // CRUD operations
  const addUser = (data, permissiondata, partners, operators, country) => {
    let adminUserAccessArray = [];
    let loopLength;
    let productLength = productID.split(",").length;
    let serviceLength = serviceID.split(",").length;
    let operatorLength = operators.length;
    let partnerLength = partners.length;
    let countryLength = country.length;

    if (
      serviceLength >
      Math.max(productLength, operatorLength, partnerLength, countryLength)
    ) {
      loopLength = serviceLength;
    } else {
      loopLength = Math.max(
        productLength,
        operatorLength,
        partnerLength,
        countryLength
      );
    }

    for (let i = 0; i < loopLength; i++) {
      adminUserAccessArray.push({
        productId: parseInt(productID[i]) ? parseInt(productID[i]) : "",
        serviceId: parseInt(serviceID[i]) ? parseInt(serviceID[i]) : "",
        partnerId: partners[i] ? partners[i] : "",
        operatorId: operators[i] ? operators[i] : "",
        countryId: country[i] ? country[i] : "",
      });
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
      })
      .catch((err) => toast(err));

    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
    setFormShow(false);
  };

  const PartnersAll = () => {
    AdminPanelService.AllPartners()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          partnersArray = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setPartners(partnersArray);
        }
      })
      .catch((err) => toast(err));
  };

  const OperatorsAll = () => {
    AdminPanelService.AllOperators()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          operatorsArray = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setOperators(operatorsArray);
        }
      })
      .catch((err) => toast(err));
  };

  const CountriesAll = () => {
    AdminPanelService.AllCountries()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          // eslint-disable-next-line
          countryArray = resp.data.map((ele) => {
            return { label: ele.name, value: ele.id };
          });
          setCountry(countryArray);
        }
      })
      .catch((err) => toast(err));
  };

  const updateUser = (id, updatedUser, permissiondata) => {
    setEditing(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    task.email = updatedUser.email;
    task.password = updatedUser.password;
    task.isAdmin = updatedUser.isAdmin;
    task.permission = permissiondata.toString();
    AdminPanelService.UpdateAdminUser(id, task)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => {
        console.log("error", err);
        toast("You have no permissions to Edit/Update");
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
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
      permission: data.permission,
    });
  };

  const showRow = (data) => {
    setFormShow(true);
    setView(true);

    setCurrentState({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
      permission: data.permission,
    });
  };

  useEffect(() => {
    if (checked) {
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
            partnersArray={partners}
            operatorsArray={operators}
            countryArray={country}
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
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Admin;
