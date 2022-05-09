import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import Select from "react-select";
import "../../styles.css";

const ServiceEdit = ({
  editing,
  setEditing,
  currentState,
  updateUser,
  setFormShow,
  headerTable,
  operatorsArray,
}) => {
  
  const [data, setUser] = useState(currentState);
  const [operator, setOperator] = useState();

  useEffect(() => {
    setUser(currentState);
  }, [editing, setEditing, currentState, updateUser]);
  // You can tell React to skip applying an effect if certain values havenÃ¢ÂÂt changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...data, [name]: value, operator });
  };

  return (
    <div>
      <EditModel
        show="true"
        setFormShow={setFormShow}
        setEditing={setEditing}
        headerTable="Edit Service"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();

            updateUser(data.id, data, operator.value);
          }}
        >
          <Form.Group>
            <Form.Label>{headerTable} Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} status</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="status"
              value={data.status}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} enablePurging</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="enablePurging"
              value={data.enablePurging}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} welcomeSMSEnabled</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="welcomeSMSEnabled"
              value={data.welcomeSMSEnabled}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} pricePoint</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="pricePoint"
              value={data.pricePoint}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} currency</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="currency"
              value={data.currency}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} days</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="days"
              value={data.days}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} taxRate</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="taxRate"
              value={data.taxRate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} freeTrialDays</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="freeTrialDays"
              value={data.freeTrialDays}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} timezone</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="timezone"
              value={data.timezone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} notificationUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="notificationUrl"
              value={data.notificationUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} command</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="command"
              value={data.command}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>operatorId</Form.Label>
            <Select
              options={operatorsArray}
              value={operator}
              onChange={setOperator}
              labelledBy="operator"
              placeholder="operator Id"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} unsubUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="unsubUrl"
              value={data.unsubUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} frequency</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="frequency"
              value={data.frequency}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} serviceUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="serviceUrl"
              value={data.serviceUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} sdpid</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="sdpid"
              value={data.sdpid}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} servicePassword</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="servicePassword"
              value={data.servicePassword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} host</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="host"
              value={data.host}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} onDemand</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="onDemand"
              value={data.onDemand}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} aggregatorId</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="aggregatorId"
              value={data.aggregatorId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} companyId</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="companyId"
              value={data.companyId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} connectionType</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="connectionType"
              value={data.connectionType}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} serviceKey</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="serviceKey"
              value={data.serviceKey}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} makOperatorId</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="makOperatorId"
              value={data.makOperatorId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} chargeCycle</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="chargeCycle"
              value={data.chargeCycle}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} ssid</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="ssid"
              value={data.ssid}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} cancelKeyword</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="cancelKeyword"
              value={data.cancelKeyword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} ChargeWith</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="ChargeWith"
              value={data.ChargeWith}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} allocatedTPS</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="allocatedTPS"
              value={data.allocatedTPS}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} shortCode</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="shortCode"
              value={data.shortCode}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} channelId</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="channelId"
              value={data.channelId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} keyword</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="keyword"
              value={data.keyword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} aliasName</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="aliasName"
              value={data.aliasName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} shortName</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="shortName"
              value={data.shortName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} onDemandSms</Form.Label>
            <Form.Control
              type="number"
              placeholder={headerTable}
              name="onDemandSms"
              value={data.onDemandSms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} otpBypass</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="otpBypass"
              value={data.otpBypass}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} initialPrice</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="initialPrice"
              value={data.initialPrice}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} otpEnabled</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="otpEnabled"
              value={data.otpEnabled}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} installmentTPS</Form.Label>
            <Form.Control
              type="number"
              placeholder={headerTable}
              name="installmentTPS"
              value={data.installmentTPS}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{headerTable} renChargingCommand</Form.Label>
            <Form.Control
              type="text"
              placeholder={headerTable}
              name="renChargingCommand"
              value={data.renChargingCommand}
              onChange={handleInputChange}
            />
          </Form.Group>
          <button className="btn btn-primary model-footer">
            Update {headerTable}
          </button>
          {/* <button
            onClick={() => {
              setEditing(false);
              setFormShow(false);
            }}
            className="btn btn-danger"
          >
            Cancel
          </button> */}
        </form>
      </EditModel>{" "}
    </div>
  );
};

export default ServiceEdit;
