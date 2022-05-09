import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AdminPanelService } from "../../Service/AdminPanelService";
import Service from "../../components/CmsComponents/Service";
import { NO_DATA } from "../../helper/Helper";
import { toast } from "react-toastify";

const ServicesCMS = () => {

  const column = ["id", "name"];
  const serviceFlag = "true";
  // Setting state
  const [initialTableData, setInitialTableData] = useState();
  const [editing, setEditing] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [formShow, setFormShow] = useState(false);

  const fetchData = () => {
    AdminPanelService.AllServices()
      .then((resp) => {
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.length) {
          setInitialTableData(resp.data);
        } else {
          toast(NO_DATA);
        }
      })
      .catch((err) => toast(err));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {initialTableData && (
            <Service
              headerTable={"Service"}
              editing={editing}
              setEditing={setEditing}
              blocking={blocking}
              setBlocking={setBlocking}
              formShow={formShow}
              setFormShow={setFormShow}
              initialTableData={initialTableData}
              setInitialTableData={setInitialTableData}
              column={column}
              serviceFlag={serviceFlag}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ServicesCMS;
