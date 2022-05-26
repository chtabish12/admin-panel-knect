import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { NO_DATA } from "../../helper/Helper";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import Partners from "../../components/CmsComponents/Partners";

const PartnersCMS = () => {
  const productFlag = "true";
  // const column = { col: ["id", "name", "partnerId", "Edit / Delete"] };
  // Setting state
  const [initialTableData, setInitialTableData] = useState();
  const [editing, setEditing] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [page, setPage] = useState(0);
  const [rowCounts, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    AdminPanelService.AllPartners(page)
      .then((resp) => {
        setRowCount(resp.data.count);
        // eslint-disable-next-line
        if (resp.statusText == "OK" && resp.data.partners.length) {
          setInitialTableData(resp.data.partners);
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
  }, [setPage, page, setFormShow]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {initialTableData && (
            <Partners
              page={page}
              setPage={setPage}
              editing={editing}
              formShow={formShow}
              rowCounts={rowCounts}
              isLoading={isLoading}
              setEditing={setEditing}
              headerTable={"Partners"}
              setFormShow={setFormShow}
              productFlag={productFlag}
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
export default PartnersCMS;
