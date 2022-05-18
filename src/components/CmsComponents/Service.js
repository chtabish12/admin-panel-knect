import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";
// import { Link } from "react-router-dom";
import ActionButtons from "../crudForm/ActionButtons";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import ServiceBlock from "../crudForm/ServiceBlock";
import EditForm from "../crudForm/ServiceEdit";
import AddForm from "../crudForm/ServiceAdd";
import ServiceShow from "../crudForm/ServiceShow";
const TableCRUD = lazy(() => import("../crudTable/TableCRUD"));

const Service = ({
  headerTable,
  editing,
  formShow,
  initialTableData,
  setInitialTableData,
  setEditing,
  setFormShow,
  serviceFlag,
  blocking,
  setBlocking,
  view,
  setView,
}) => {
  // Setting state
  const initialFormState = {
    name: "",
    status: "",
    enablePurging: "",
    welcomeSMSEnabled: "",
    pricePoint: "",
    currency: "",
    days: "",
    taxRate: "",
    freeTrialDays: "",
    timezone: "",
    notificationUrl: "",
    command: "",
    operatorId: "",
    unsubUrl: "",
    frequency: "",
    serviceUrl: "",
    sdpid: "",
    servicePassword: "",
    host: "",
    onDemand: "",
    aggregatorId: "",
    companyId: "",
    connectionType: "",
    serviceKey: "",
    makOperatorId: "",
    chargeCycle: "",
    ssid: "",
    cancelKeyword: "",
    ChargeWith: "",
    allocatedTPS: "",
    shortCode: "",
    channelId: "",
    keyword: "",
    aliasName: "",
    shortName: "",
    onDemandSms: null,
    otpBypass: "",
    initialPrice: "",
    otpEnabled: "",
    installmentTPS: null,
    renChargingCommand: "",
  };

  const [operatorsArray, setOperatorsArray] = useState([]);
  const [currentState, setCurrentState] = useState(initialFormState);
  const [show, setShow] = useState(false);
  let operators = [];

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      // renderCell: (params) => (
      //   <Link
      //     to={{ pathname: "servicesDetailPage", state: params.id }}
      //     className="table-name-href"
      //   >
      //     {params.value}
      //   </Link>
      // ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (rowData) => {
        return rowData.value === 1 ? (
          <span style={{ color: "#008240", fontWeight: "bold" }}>Active</span>
        ) : rowData.value === 2 ? (
          <span style={{ color: "#E87722", fontWeight: "bold" }}>Deactive</span>
        ) : (
          <span style={{ color: "#B0B700", fontWeight: "bold" }}>UnActive</span>
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
          blockRow={blockRow}
          showRow={showRow}
          serviceFlag="true"
        />
      ),
      flex: 1,
    },
  ];
  // CRUD operations
  const addUser = (data, operatorID) => {
    const request = {
      name: data.name,
      status: data.status,
      enablePurging: data.enablePurging,
      welcomeSMSEnabled: data.welcomeSMSEnabled,
      pricePoint: data.pricePoint,
      currency: data.currency,
      days: data.days,
      taxRate: data.taxRate,
      freeTrialDays: data.freeTrialDays,
      timezone: data.timezone,
      notificationUrl: data.notificationUrl,
      command: data.command,
      operatorId: parseInt(operatorID),
      unsubUrl: data.unsubUrl,
      frequency: data.frequency,
      serviceUrl: data.serviceUrl,
      sdpid: data.sdpid,
      servicePassword: data.servicePassword,
      host: data.host,
      onDemand: data.onDemand,
      aggregatorId: data.aggregatorId,
      companyId: data.companyId,
      connectionType: data.connectionType,
      serviceKey: data.serviceKey,
      makOperatorId: data.makOperatorId,
      chargeCycle: data.chargeCycle,
      ssid: data.ssid,
      cancelKeyword: data.cancelKeyword,
      ChargeWith: data.ChargeWith,
      allocatedTPS: data.allocatedTPS,
      shortCode: data.shortCode,
      channelId: data.channelId,
      keyword: data.keyword,
      aliasName: data.aliasName,
      shortName: data.shortName,
      onDemandSms: data.onDemandSms,
      otpBypass: data.otpBypass,
      initialPrice: data.initialPrice,
      otpEnabled: data.otpEnabled,
      installmentTPS: data.installmentTPS,
      renChargingCommand: data.renChargingCommand,
    };

    AdminPanelService.AddService(request)
      .then((resp) => {
        toast(resp.data);
        setShow(false);
      })
      .catch((err) => toast("Please Check your fields"));

    data.id = initialTableData.length + 1;
    setInitialTableData([...initialTableData, data]);
  };

  // const deleteUser = id => {
  //   setEditing(false);

  //   setInitialTableData(initialTableData.filter(data => data.id !== id));
  // };

  const updateUser = (id, updatedUser, operatorValue) => {
    setEditing(false);
    setView(false);
    const task = [updatedUser].find((t) => t.id === updatedUser.id);
    task.name = updatedUser.name;
    task.status = updatedUser.status;
    task.enablePurging = updatedUser.enablePurging;
    task.welcomeSMSEnabled = updatedUser.welcomeSMSEnabled;
    task.pricePoint = updatedUser.pricePoint;
    task.currency = updatedUser.currency;
    task.days = updatedUser.days;
    task.taxRate = updatedUser.taxRate;
    task.freeTrialDays = updatedUser.freeTrialDays;
    task.timezone = updatedUser.timezone;
    task.notificationUrl = updatedUser.notificationUrl;
    task.command = updatedUser.command;
    task.operatorId = operatorValue;
    task.unsubUrl = updatedUser.unsubUrl;
    task.frequency = updatedUser.frequency;
    task.serviceUrl = updatedUser.serviceUrl;
    task.sdpid = updatedUser.sdpid;
    task.servicePassword = updatedUser.servicePassword;
    task.host = updatedUser.host;
    task.onDemand = updatedUser.onDemand;
    task.aggregatorId = updatedUser.aggregatorId;
    task.companyId = updatedUser.companyId;
    task.connectionType = updatedUser.connectionType;
    task.serviceKey = updatedUser.serviceKey;
    task.makOperatorId = updatedUser.makOperatorId;
    task.chargeCycle = updatedUser.chargeCycle;
    task.ssid = updatedUser.ssid;
    task.cancelKeyword = updatedUser.cancelKeyword;
    task.ChargeWith = updatedUser.ChargeWith;
    task.allocatedTPS = updatedUser.allocatedTPS;
    task.shortCode = updatedUser.shortCode;
    task.channelId = updatedUser.channelId;
    task.keyword = updatedUser.keyword;
    task.aliasName = updatedUser.aliasName;
    task.shortName = updatedUser.shortName;
    task.onDemandSms = updatedUser.onDemandSms;
    task.otpBypass = updatedUser.otpBypass;
    task.initialPrice = updatedUser.initialPrice;
    task.otpEnabled = updatedUser.otpEnabled;
    task.installmentTPS = updatedUser.installmentTPS;
    task.renChargingCommand = updatedUser.renChargingCommand;

    AdminPanelService.UpdateService(id, task)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => toast("Please Check your fields"));
    setFormShow(false);
    setInitialTableData(
      initialTableData.map((data) => (data.id === id ? updatedUser : data))
    );
  };

  const blockSerive = (id, state) => {
    setBlocking(false);
    AdminPanelService.BlockService(id, state)
      .then((resp) => {
        toast(resp.data);
      })
      .catch((err) => {
        toast(err);
      });

    setFormShow(false);
    setInitialTableData(
      initialTableData.map((data) => (data.id === id ? state : data))
    );
  };

  const editRow = (data) => {
    setFormShow(true);
    setEditing(true);

    setCurrentState({
      id: data.id,
      name: data.name,
      status: data.status,
      enablePurging: data.enablePurging,
      welcomeSMSEnabled: data.welcomeSMSEnabled,
      pricePoint: data.pricePoint,
      currency: data.currency,
      days: data.days,
      taxRate: data.taxRate,
      freeTrialDays: data.freeTrialDays,
      timezone: data.timezone,
      notificationUrl: data.notificationUrl,
      command: data.command,
      operatorId: data.operatorId,
      unsubUrl: data.unsubUrl,
      frequency: data.frequency,
      serviceUrl: data.serviceUrl,
      sdpid: data.sdpid,
      servicePassword: data.servicePassword,
      host: data.host,
      onDemand: data.onDemand,
      aggregatorId: data.aggregatorId,
      companyId: data.companyId,
      connectionType: data.connectionType,
      serviceKey: data.serviceKey,
      makOperatorId: data.makOperatorId,
      chargeCycle: data.chargeCycle,
      ssid: data.ssid,
      cancelKeyword: data.cancelKeyword,
      ChargeWith: data.ChargeWith,
      allocatedTPS: data.allocatedTPS,
      shortCode: data.shortCode,
      channelId: data.channelId,
      keyword: data.keyword,
      aliasName: data.aliasName,
      shortName: data.shortName,
      onDemandSms: data.onDemandSms,
      otpBypass: data.otpBypass,
      initialPrice: data.initialPrice,
      otpEnabled: data.otpEnabled,
      installmentTPS: data.installmentTPS,
      renChargingCommand: data.renChargingCommand,
    });
  };

  const showRow = (data) => {
    setFormShow(true);
    setView(true);

    setCurrentState({
      id: data.id,
      name: data.name,
      status: data.status,
      enablePurging: data.enablePurging,
      welcomeSMSEnabled: data.welcomeSMSEnabled,
      pricePoint: data.pricePoint,
      currency: data.currency,
      days: data.days,
      taxRate: data.taxRate,
      freeTrialDays: data.freeTrialDays,
      timezone: data.timezone,
      notificationUrl: data.notificationUrl,
      command: data.command,
      operatorId: data.operatorId,
      unsubUrl: data.unsubUrl,
      frequency: data.frequency,
      serviceUrl: data.serviceUrl,
      sdpid: data.sdpid,
      servicePassword: data.servicePassword,
      host: data.host,
      onDemand: data.onDemand,
      aggregatorId: data.aggregatorId,
      companyId: data.companyId,
      connectionType: data.connectionType,
      serviceKey: data.serviceKey,
      makOperatorId: data.makOperatorId,
      chargeCycle: data.chargeCycle,
      ssid: data.ssid,
      cancelKeyword: data.cancelKeyword,
      ChargeWith: data.ChargeWith,
      allocatedTPS: data.allocatedTPS,
      shortCode: data.shortCode,
      channelId: data.channelId,
      keyword: data.keyword,
      aliasName: data.aliasName,
      shortName: data.shortName,
      onDemandSms: data.onDemandSms,
      otpBypass: data.otpBypass,
      initialPrice: data.initialPrice,
      otpEnabled: data.otpEnabled,
      installmentTPS: data.installmentTPS,
      renChargingCommand: data.renChargingCommand,
    });
  };

  const blockRow = (data) => {
    setFormShow(true);
    setBlocking(true);

    setCurrentState({
      id: data.id,
      name: data.name,
      status: data.status,
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
            <Card>
              {editing && (
                <Fragment>
                  <h5>Edit Service</h5>
                  <EditForm
                    editing={editing}
                    setEditing={setEditing}
                    currentState={currentState}
                    updateUser={updateUser}
                    setFormShow={setFormShow}
                    headerTable={headerTable}
                    operatorsArray={operatorsArray}
                  />
                </Fragment>
              )}
              {view && (
                <Fragment>
                  <h5>Show Service</h5>
                  <ServiceShow
                    setView={setView}
                    currentState={currentState}
                    setFormShow={setFormShow}
                    headerTable={headerTable}
                    operatorsArray={operatorsArray}
                  />
                </Fragment>
              )}
              {blocking && (
                <Fragment>
                  <h5>Block Service</h5>
                  <ServiceBlock
                    currentState={currentState}
                    updateUser={updateUser}
                    setFormShow={setFormShow}
                    headerTable={headerTable}
                    blockSerive={blockSerive}
                    blocking={blocking}
                    setBlocking={setBlocking}
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
            operatorsArray={operatorsArray}
            show={show}
            setShow={setShow}
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
              blockRow={blockRow}
              blockSerive={blockSerive}
              column={columns}
              serviceFlag={serviceFlag}
              // deleteUser={deleteUser}
            />{" "}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Service;
