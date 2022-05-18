import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AdminPanelService } from "../../Service/AdminPanelService";
import Service from "../../components/CmsComponents/Service";
import { NO_DATA } from "../../helper/Helper";
import { toast } from "react-toastify";

const ServicesCMS = () => {
  const serviceFlag = "true";
  // Setting state
  const [initialTableData, setInitialTableData] = useState();
  const [editing, setEditing] = useState(false);
  const [view, setView] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [page, setPage] = useState(0);
  const [rowCounts, setRowCount] = useState(0);

  const fetchData = () => {
    AdminPanelService.AllServices(page)
      .then((resp) => {
        setRowCount(resp.data.count);
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.services.length) {
          setInitialTableData(resp.data.services);
        } else {
          toast(NO_DATA);
        }
      })
      .catch((err) => toast(err));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [setPage, page]);

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
              serviceFlag={serviceFlag}
              view={view}
              setView={setView}
              page={page}
              setPage={setPage}
              rowCounts={rowCounts}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ServicesCMS;
