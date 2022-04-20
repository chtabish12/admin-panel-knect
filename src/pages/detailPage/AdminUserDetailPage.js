import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { AdminPanelService } from "../../Service/AdminPanelService";
import Widget from "../../components/Widget/Widget";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { NO_DATA } from "../../helper/Helper";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function AdminUserDetailPage() {
  const location = useLocation();
  const [detailPageData, setDetailPageData] = useState();

  useEffect(() => {
    AdminPanelService.GetAdminUserById(location.state)
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
        to={{ pathname: "adminUsersCMS" }}
        className="table-name-href"
        style={{ float: "right" }}
      >
        <Button>Go Back</Button>
      </Link>
      <PageTitle title="Admin Users Detail Page" />
      <Grid container spacing={2}>
        <Widget style={{ height: "77vh", width: "100%" }}>
          <Grid item xs={12} md={12}>
            {detailPageData && (
              <Card className="text-left">
                <Card.Header>
                  Name :{" "}
                  <b>{detailPageData.name.toUpperCase().replaceAll('"', "")}</b>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Admin User :{" "}
                    <b>
                      {detailPageData.isAdmin === 1
                        ? "True"
                        : detailPageData.isAdmin === 0
                        ? "False"
                        : detailPageData.isAdmin === 2
                        ? "Not a User"
                        : detailPageData.isAdmin === 3
                        ? "BlackList"
                        : "N/A"}
                    </b>
                  </Card.Title>
                  <Card.Text>
                    <div>
                      Admin User Password : <b>{detailPageData.password}</b>
                    </div>
                    <div>
                      Email : <b>{detailPageData.email}</b>
                    </div>
                  </Card.Text>
                  <div>
                    User Permissions = <b>{detailPageData.permission}</b>
                  </div>
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
