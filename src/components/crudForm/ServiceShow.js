import React from "react";
import { Form } from "react-bootstrap";
import ShowModel from "../model/ShowModel";
import Select from "react-select";
import "../../styles.css";

const ServiceShow = ({
  setView,
  currentState,
  setFormShow,
  headerTable,
  operatorsArray,
}) => {
  return (
    <div>
      <ShowModel
        show="true"
        setFormShow={setFormShow}
        setView={setView}
        headerTable="Edit Service"
      >
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="name"
            value={currentState.name}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} status</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="status"
            value={currentState.status}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} enablePurging</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="enablePurging"
            value={currentState.enablePurging}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} welcomeSMSEnabled</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="welcomeSMSEnabled"
            value={currentState.welcomeSMSEnabled}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} pricePoint</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="pricePoint"
            value={currentState.pricePoint}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} currency</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="currency"
            value={currentState.currency}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} days</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="days"
            value={currentState.days}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} taxRate</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="taxRate"
            value={currentState.taxRate}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} freeTrialDays</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="freeTrialDays"
            value={currentState.freeTrialDays}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} timezone</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="timezone"
            value={currentState.timezone}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} notificationUrl</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="notificationUrl"
            value={currentState.notificationUrl}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} command</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="command"
            value={currentState.command}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>operatorId</Form.Label>
          <Select
            options={operatorsArray}
            value={currentState.operator}
            //   onChange={setOperator}
            labelledBy="operator"
            placeholder="operator Id"
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} unsubUrl</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="unsubUrl"
            value={currentState.unsubUrl}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} frequency</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="frequency"
            value={currentState.frequency}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} serviceUrl</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="serviceUrl"
            value={currentState.serviceUrl}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} sdpid</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="sdpid"
            value={currentState.sdpid}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} servicePassword</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="servicePassword"
            value={currentState.servicePassword}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} host</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="host"
            value={currentState.host}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} onDemand</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="onDemand"
            value={currentState.onDemand}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} aggregatorId</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="aggregatorId"
            value={currentState.aggregatorId}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} companyId</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="companyId"
            value={currentState.companyId}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} connectionType</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="connectionType"
            value={currentState.connectionType}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} serviceKey</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="serviceKey"
            value={currentState.serviceKey}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} makOperatorId</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="makOperatorId"
            value={currentState.makOperatorId}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} chargeCycle</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="chargeCycle"
            value={currentState.chargeCycle}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} ssid</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="ssid"
            value={currentState.ssid}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} cancelKeyword</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="cancelKeyword"
            value={currentState.cancelKeyword}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} ChargeWith</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="ChargeWith"
            value={currentState.ChargeWith}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} allocatedTPS</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="allocatedTPS"
            value={currentState.allocatedTPS}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} shortCode</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="shortCode"
            value={currentState.shortCode}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} channelId</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="channelId"
            value={currentState.channelId}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} keyword</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="keyword"
            value={currentState.keyword}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} aliasName</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="aliasName"
            value={currentState.aliasName}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} shortName</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="shortName"
            value={currentState.shortName}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} onDemandSms</Form.Label>
          <Form.Control
            type="number"
            placeholder={headerTable}
            name="onDemandSms"
            value={currentState.onDemandSms}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} otpBypass</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="otpBypass"
            value={currentState.otpBypass}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} initialPrice</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="initialPrice"
            value={currentState.initialPrice}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} otpEnabled</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="otpEnabled"
            value={currentState.otpEnabled}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} installmentTPS</Form.Label>
          <Form.Control
            type="number"
            placeholder={headerTable}
            name="installmentTPS"
            value={currentState.installmentTPS}
          />
        </Form.Group>
        <Form.Group className="formgroup-space">
          <Form.Label>{headerTable} renChargingCommand</Form.Label>
          <Form.Control
            type="text"
            placeholder={headerTable}
            name="renChargingCommand"
            value={currentState.renChargingCommand}
          />
        </Form.Group>
        {/* </form> */}
      </ShowModel>
    </div>
  );
};

export default ServiceShow;
