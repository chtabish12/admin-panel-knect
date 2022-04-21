import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button, Card, ListGroup } from "react-bootstrap";
import { AdminPanelService } from "../../Service/AdminPanelService";
import Widget from "../../components/Widget/Widget";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { NO_DATA } from "../../helper/Helper";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function ServicesDetailsPage() {
  const location = useLocation();
  const [detailPageData, setDetailPageData] = useState();

  useEffect(() => {
    AdminPanelService.GetServiceById(location.state)
      .then((resp) => {
        if (resp.statusText === "OK") {
          setDetailPageData(resp.data);
        } else {
          toast(NO_DATA);
        }
      })
      .catch((err) => toast(err));
  }, [location.state]);
  return (
    <>
      <Link
        to={{ pathname: "servicesCMS" }}
        className="table-name-href"
        style={{ float: "right" }}
      >
        <Button>Go Back</Button>
      </Link>
      <PageTitle title="Service Detail Page" />
      <Grid container spacing={2}>
        <Widget style={{ height: "auto", width: "100%" }}>
          <Grid item xs={12} md={12}>
            {detailPageData && (
              <Card className="text-left">
                <Card.Header>
                  Name :{" "}
                  <b>{detailPageData.name.toUpperCase().replaceAll('"', "")}</b>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item variant="primary">
                      <span className="space-between">
                        Service ID :{" "}
                        <b>{detailPageData.id ? detailPageData.id : 0} </b>{" "}
                      </span>{" "}
                      <span className="space-between">
                        Product ID :{" "}
                        <b>
                          {" "}
                          {detailPageData.productId
                            ? detailPageData.productId
                            : 0}
                        </b>{" "}
                      </span>
                      <span className="space-between">
                        OperatorId :{" "}
                        <b>
                          {detailPageData.operatorId
                            ? detailPageData.operatorId
                            : 0}
                        </b>{" "}
                      </span>
                      <span className="space-between">
                        AggregatorId :{" "}
                        <b>
                          {detailPageData.aggregatorId
                            ? detailPageData.aggregatorId
                            : 0}
                        </b>
                      </span>
                      <span className="space-between">
                        Company ID :{" "}
                        <b>
                          {detailPageData.companyId
                            ? detailPageData.companyId
                            : 0}
                        </b>
                      </span>
                      <span className="space-between">
                        ChannelId :{" "}
                        <b>
                          {detailPageData.channelId
                            ? detailPageData.channelId
                            : 0}
                        </b>
                      </span>
                      <span className="space-between">
                        NewChannelId :{" "}
                        <b>
                          {detailPageData.newChannelId
                            ? detailPageData.newChannelId
                            : 0}
                        </b>
                      </span>
                      <span className="space-between">
                        Sdpid :{" "}
                        <b>{detailPageData.sdpid ? detailPageData.sdpid : 0}</b>
                      </span>
                      <span className="space-between">
                        ServiceId :{" "}
                        <b>
                          {detailPageData.serviceId
                            ? detailPageData.serviceId
                            : 0}
                        </b>
                      </span>
                      <span className="space-between">
                        MakOperatorId :{" "}
                        <b>
                          {detailPageData.makOperatorId
                            ? detailPageData.makOperatorId
                            : 0}
                        </b>
                      </span>
                      <span className="space-between">
                        Ssid :{" "}
                        <b>{detailPageData.ssid ? detailPageData.ssid : 0}</b>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="secondary">
                      <span className="space-between">
                        Status : <b>{detailPageData.status}</b>
                      </span>
                      <span className="space-between">
                        ServicePassword :{" "}
                        <b>{detailPageData.servicePassword}</b>{" "}
                      </span>
                      <span className="space-between">
                        TaxRate : <b>{detailPageData.taxRate}</b>
                      </span>
                      <span className="space-between">
                        PricePoint : <b>{detailPageData.pricePoint}</b>{" "}
                      </span>
                      <span className="space-between">
                        ChargeWith : <b>{detailPageData.ChargeWith}</b>
                      </span>
                      <span className="space-between">
                        ShortName : <b>{detailPageData.shortName}</b>
                      </span>
                      <span className="space-between">
                        ChargeCycle : <b>{detailPageData.chargeCycle}</b>
                      </span>
                      <span className="space-between">
                        Currency : <b>{detailPageData.currency}</b>{" "}
                      </span>
                      <span className="space-between">
                        Timezone : <b>{detailPageData.timezone}</b>{" "}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="success">
                      <span className="space-between">
                        OnDemand : <b>{detailPageData.onDemand}</b>
                      </span>
                      <span className="space-between">
                        OnDemandSms : <b>{detailPageData.onDemandSms}</b>
                      </span>
                      <span className="space-between">
                        OpShare : <b>{detailPageData.opShare}</b>
                      </span>
                      <span className="space-between">
                        OtpBypass : <b>{detailPageData.otpBypass}</b>
                      </span>
                      <span className="space-between">
                        OtpEnabled : <b>{detailPageData.otpEnabled}</b>
                      </span>
                      <span className="space-between">
                        ShortCode : <b>{detailPageData.shortCode}</b>
                      </span>
                      <span className="space-between">
                        WelcomeSMSEnabled :{" "}
                        <b>{detailPageData.welcomeSMSEnabled}</b>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                      <span className="space-between-url">
                        NotificationUrl :{" "}
                        <b>{detailPageData.notificationUrl}</b>
                      </span>
                      <span className="space-between-url">
                        UnSubUrl : <b>{detailPageData.unsubUrl}</b>
                      </span>
                      <span className="space-between-url">
                        ServiceUrl : <b>{detailPageData.serviceUrl}</b>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="warning">
                      <span className="space-between">
                        EnablePurging : <b>{detailPageData.enablePurging}</b>{" "}
                      </span>
                      <span className="space-between">
                        KnectNetShare : <b>{detailPageData.knectNetShare}</b>{" "}
                      </span>
                      <span className="space-between">
                        KnectToplineShare :{" "}
                        <b>{detailPageData.knectToplineShare}</b>{" "}
                      </span>
                      <span className="space-between">
                        ServiceKey : <b>{detailPageData.serviceKey}</b>{" "}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <span className="space-between">
                        Command : <b>{detailPageData.command}</b>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="dark">
                      <span className="space-between">
                        FreeTrialDays : <b>{detailPageData.freeTrialDays}</b>{" "}
                      </span>
                      <span className="space-between">
                        InitialPrice : <b>{detailPageData.initialPrice}</b>{" "}
                      </span>
                      <span className="space-between">
                        InstallmentTPS : <b>{detailPageData.installmentTPS}</b>{" "}
                      </span>
                      <span className="space-between">
                        PartnerShare : <b>{detailPageData.partnerShare}</b>{" "}
                      </span>
                      <span className="space-between">
                        RenChargingCommand :{" "}
                        <b>{detailPageData.renChargingCommand}</b>{" "}
                      </span>
                      <span className="space-between">
                        RenewalChargingCommand :{" "}
                        <b>{detailPageData.renewalChargingCommand}</b>{" "}
                      </span>
                      <span className="space-between">
                        ConnectionType : <b>{detailPageData.connectionType}</b>
                      </span>
                      <span className="space-between">
                        AllocatedTPS : <b>{detailPageData.allocatedTPS}</b>
                      </span>
                      <span className="space-between">
                        AliasName : <b>{detailPageData.aliasName}</b>
                      </span>
                      <span className="space-between">
                        CancelKeyword : <b>{detailPageData.cancelKeyword}</b>
                      </span>
                      <span className="space-between">
                        Frequency : <b>{detailPageData.frequency}</b> Days :{" "}
                        <b>{detailPageData.days}</b>
                      </span>
                      <span className="space-between">
                        Host : <b>{detailPageData.host}</b>
                      </span>
                      <span className="space-between">
                        Keyword : <b>{detailPageData.keyword}</b>
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <div>
                    createdAt : <b>{detailPageData.createdAt}</b>
                  </div>
                  <div>
                    updatedAt : <b>{detailPageData.updatedAt}</b>
                  </div>
                </Card.Footer>
              </Card>
            )}
          </Grid>
        </Widget>
      </Grid>
    </>
  );
}
