import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AdminPanelService } from "../../Service/AdminPanelService";
import { NO_DATA } from "../../helper/Helper";
import { toast } from "react-toastify";
import Partners from "../../components/CmsComponents/Partners";

const PartnersCMS = () => {
  const productFlag = "true";
  // const column = { col: ["id", "name", "partnerId", "Edit / Delete"] };
  // Setting state
  const [initialTableData, setInitialTableData] = useState();
  const [editing, setEditing] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const fetchData = () => {
    AdminPanelService.AllPartnersData()
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
            <Partners
              headerTable={"Partners"}
              editing={editing}
              setEditing={setEditing}
              formShow={formShow}
              setFormShow={setFormShow}
              initialTableData={initialTableData}
              setInitialTableData={setInitialTableData}
              // column={column}
              productFlag={productFlag}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default PartnersCMS;
