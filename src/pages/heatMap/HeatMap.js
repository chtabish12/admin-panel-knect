import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "../../components/HeatMapTable/styles.css";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { BASE_URL } from "../../Constants";
import axios from "axios";
import PageTitle from "../../components/PageTitle/PageTitle.js";
//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// styles
import useStyles from "./styles";
import HeatMapTable from "../../components/HeatMapTable/HeatMapTable";

const HeatMap = () => {
  // local
  const classes = useStyles();
  const [affiliateValue, setAffiliateValue] = useState([]);
  const [serviceSelectValue, setServiceSelectValue] = useState([]);
  var ApiData = [];
  let affiliatesArray = [];
  let serviceArray = [];
  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  // API
  const [affiliatesList, setAffiliatesList] = useState("");
  const [serviceList, setServiceList] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const { handleSubmit } = useForm();

  const fetchData = async () => {
    const url = `${BASE_URL}report/affiliates`;
    axios
      .get(url, {
        headers: {
          token: sessionStorage.getItem("token-user"),
        },
      })
      .then((resp) => {
        ApiData = resp.data;
        if (resp.status === 200 && resp.data.length) {
          // affiliates Array array data for displaying dropdown
          for (let i = 0; i < ApiData.length; i++)
            affiliatesArray.push({
              value: ApiData[i].id,
              label: ApiData[i].sourceName,
            });
          // removing duplicates
          affiliatesArray = affiliatesArray.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.label === value.label && t.value === value.value
              )
          );
          setAffiliatesList(affiliatesArray);

          // Service array data for displaying dropdown
          const LoginApiResp = JSON.parse(localStorage.getItem("api-data"));
          for (let x = 0; x < LoginApiResp.length; x++) {
            for (let y = 0; y < LoginApiResp[x].products.length; y++)
              for (
                let i = 0;
                i < LoginApiResp[x].products[y].services.length;
                i++
              ) {
                serviceArray.push({
                  value: LoginApiResp[x].products[y].services[i].id,
                  label: LoginApiResp[x].products[y].services[i].name,
                });
              }
            serviceArray = serviceArray.filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.label === value.label && t.value === value.value
                )
            );
          }
          setServiceList(serviceArray);
        } else if (resp.status === 400 && resp.status === 404) {
          return toast("Wrong attempt, Please retry!!");
        }
      });
  };

  const formSubmit = async () => {
    setTableShow(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <PageTitle title="Services HeatMap" />
      <div className={classes.dashedBorder}>
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <div className="multiSelect">
            Services
            <Select
              options={serviceList}
              value={serviceSelectValue}
              onChange={setServiceSelectValue}
              labelledBy="Services"
            />
          </div>
          <div className="multiSelect">
            Affiliates
            <Select
              options={affiliatesList}
              value={affiliateValue}
              onChange={setAffiliateValue}
              labelledBy="Products"
            />
          </div>
          <div className="header-right-reporting">
            <div>
              Start date
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              End date
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="button-reporting">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                // disabled={!serviceSelectValue.length || !affiliateValue.length}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={20}>
          <div className={classes.dashedBorder}>
            <HeatMapTable
              affiliatesSelect={affiliateValue}
              serviceSelect={serviceSelectValue}
              startDate={startDate}
              endDate={endDate}
              tableShow={tableShow}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default HeatMap;
