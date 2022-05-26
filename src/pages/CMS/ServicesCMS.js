import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AdminPanelService } from "../../Service/AdminPanelService";
import Service from "../../components/CmsComponents/Service";
import { RotatingLines } from "react-loader-spinner";
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    AdminPanelService.AllServices(page)
      .then((resp) => {
        setRowCount(resp.data.count);
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.services.length) {
          setInitialTableData(resp.data.services);
          setIsLoading(false);
        } else {
          toast(NO_DATA);
        }
      })
      .catch((err) => toast(err));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [setPage, page, formShow]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {initialTableData && (
            <Service
              view={view}
              page={page}
              setView={setView}
              setPage={setPage}
              editing={editing}
              blocking={blocking}
              formShow={formShow}
              rowCounts={rowCounts}
              isLoading={isLoading}
              headerTable={"Service"}
              setEditing={setEditing}
              setBlocking={setBlocking}
              setFormShow={setFormShow}
              serviceFlag={serviceFlag}
              initialTableData={initialTableData}
              setInitialTableData={setInitialTableData}
            />
          )}
          {isLoading && (
            <div className="spinner" style={{ marginTop: "30vh" }}>
              <RotatingLines width="100" strokeColor="#536DFE" />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ServicesCMS;
