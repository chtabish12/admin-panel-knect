import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import EditModel from "../model/EditModel";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
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
            if (!operator) return toast("please select Operator");
            updateUser(data.id, data, operator.value);
          }}
        >
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} Name<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g Xyz"}
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} status<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="status"
              value={data.status}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} enablePurging</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="enablePurging"
              value={data.enablePurging}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} welcomeSMSEnabled</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="welcomeSMSEnabled"
              value={data.welcomeSMSEnabled}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} pricePoint<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="pricePoint"
              value={data.pricePoint}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              {headerTable} currency<span className="asteric">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g PKR"}
              name="currency"
              value={data.currency}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} days</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="days"
              value={data.days}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} taxRate</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="taxRate"
              value={data.taxRate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} freeTrialDays</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="freeTrialDays"
              value={data.freeTrialDays}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} timezone</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g +00:00"}
              name="timezone"
              value={data.timezone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} notificationUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g hrrp://xyz.com"}
              name="notificationUrl"
              value={data.notificationUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} command</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g xyz"}
              name="command"
              value={data.command}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>
              operator<span className="asteric">*</span>
            </Form.Label>
            <Select
              options={operatorsArray}
              value={operator}
              onChange={setOperator}
              labelledBy="operator"
              placeholder="select operator"
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} unsubUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g hrrp://xyz.com"}
              name="unsubUrl"
              value={data.unsubUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} frequency</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g daily"}
              name="frequency"
              value={data.frequency}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} serviceUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g hrrp://xyz.com"}
              name="serviceUrl"
              value={data.serviceUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} sdpid</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="sdpid"
              value={data.sdpid}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} servicePassword</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="servicePassword"
              value={data.servicePassword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} host</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="host"
              value={data.host}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} onDemand</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="onDemand"
              value={data.onDemand}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} aggregatorId</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="aggregatorId"
              value={data.aggregatorId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} companyId</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="companyId"
              value={data.companyId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} connectionType</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="connectionType"
              value={data.connectionType}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} serviceKey</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="serviceKey"
              value={data.serviceKey}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} makOperatorId</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="makOperatorId"
              value={data.makOperatorId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} chargeCycle</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="chargeCycle"
              value={data.chargeCycle}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} ssid</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="ssid"
              value={data.ssid}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} cancelKeyword</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="cancelKeyword"
              value={data.cancelKeyword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} ChargeWith</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g xyz"}
              name="ChargeWith"
              value={data.ChargeWith}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} allocatedTPS</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g 0"}
              name="allocatedTPS"
              value={data.allocatedTPS}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} shortCode</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="shortCode"
              value={data.shortCode}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} channelId</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="channelId"
              value={data.channelId}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} keyword</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="keyword"
              value={data.keyword}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} aliasName</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="aliasName"
              value={data.aliasName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} shortName</Form.Label>
            <Form.Control
              type="text"
              placeholder={"e.g TP 0"}
              name="shortName"
              value={data.shortName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} onDemandSms</Form.Label>
            <Form.Control
              type="number"
              placeholder={"e.g 0"}
              name="onDemandSms"
              value={data.onDemandSms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} otpBypass</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="otpBypass"
              value={data.otpBypass}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} initialPrice</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="initialPrice"
              value={data.initialPrice}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} otpEnabled</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="otpEnabled"
              value={data.otpEnabled}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} installmentTPS</Form.Label>
            <Form.Control
              type="number"
              placeholder={"e.g 0"}
              name="installmentTPS"
              value={data.installmentTPS}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="formgroup-space">
            <Form.Label>{headerTable} renChargingCommand</Form.Label>
            <Form.Control
              type="text"
              // placeholder={headerTable}
              name="renChargingCommand"
              value={data.renChargingCommand}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="button-footer">
            <Button
              variant="danger"
              onClick={() => {
                setFormShow(false);
                setEditing(false);
              }}
            >
              Close
            </Button>
            <button className="btn btn-primary model-footer">Update</button>
          </div>
        </form>
      </EditModel>{" "}
    </div>
  );
};

export default ServiceEdit;
