import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { BASE_URL } from "../../Constants";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import PageTitle from "../../components/PageTitle/PageTitle.js";
import HeatMapTable from "../../components/HeatMapTable/HeatMapTable";
//date picker
import DatePicker from "react-datepicker";
// styles
import useStyles from "./styles";
import "../../components/HeatMapTable/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const HeatMap = () => {
  // local
  const classes = useStyles();
  const [affiliateValue, setAffiliateValue] = useState([]);
  const [serviceSelectValue, setServiceSelectValue] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // API
  const [affiliatesList, setAffiliatesList] = useState("");
  const [serviceList, setServiceList] = useState("");
  const [tableShow, setTableShow] = useState(false);
  // date picker
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  const { handleSubmit } = useForm();
  var ApiData = [];
  let affiliatesArray = [];
  let serviceArray = [];
  let productArray = [];
  const LoginApiResp = JSON.parse(localStorage.getItem("api-data"));
  // Product array data for displaying dropdown
  for (let i = 0; i < LoginApiResp.length; i++)
    for (let x = 0; x < LoginApiResp[i].products.length; x++) {
      productArray.push({
        value: LoginApiResp[i].products[x].id,
        label: LoginApiResp[i].products[x].name,
      });
    } // removing duplicates
  productArray = productArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.label === value.label && t.value === value.value)
  );

  // Service array data for displaying dropdown
  if (productSelect) {
    for (let x = 0; x < LoginApiResp.length; x++) {
      for (let y = 0; y < LoginApiResp[x].products.length; y++)
        for (let i = 0; i < LoginApiResp[x].products[y].services.length; i++) {
          if (
            LoginApiResp[x].products[y].services[i].productId ===
            productSelect.value
          ) {
            serviceArray.push({
              value: LoginApiResp[x].products[y].services[i].id,
              label: LoginApiResp[x].products[y].services[i].name,
            });
          }
        }
    }
  }

  const fetchFiltersData = async () => {
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
          serviceArray = serviceArray.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.label === value.label && t.value === value.value
              )
          );

          setServiceList(serviceArray);
        } else {
          return toast("No Data Found!!, Please come later!!");
        }
      });
  };

  const fetchData = () => {
    let startdate = moment(startDate).format("YYYY-MM-DD");
    let enddate = moment(endDate).format("YYYY-MM-DD");
    const url = `${BASE_URL}report/heatMapReport?`;
    axios
      .get(url, {
        headers: {
          token: sessionStorage.getItem("token-user"),
        },
        params: {
          // serviceId: 8,
          // startDate: "2021-11-01",
          // endDate: "2021-12-30",
          // affiliateId: 1,
          serviceId: `${serviceSelectValue.value}`,
          startDate: `${startdate}`,
          endDate: `${enddate}`,
          affiliateId: `${affiliateValue.value}`,
        },
      })
      .then((resp) => {
        setIsLoading(false);
        if (resp.status === 200 && resp.data.length) {
          let data = JSON.stringify(resp.data);
          data = JSON.parse(data);
          setResponse(data);
        } else {
          return toast("Wrong attempt, Please retry!!");
        }
      });
  };
  const formSubmit = () => {
    fetchData();
    setTableShow(true);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchFiltersData();
    }
  }, [isLoading, productSelect]);

  return (
    <>
      <PageTitle title="Services HeatMap" />
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className={classes.dashedBorder}>
          <div className="multiSelect">
            Products
            <Select
              options={productArray}
              value={productSelect}
              onChange={setProductSelect}
              labelledBy="Services"
            />
          </div>
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
          <div className="header-right-heat">
            <div className="start-date">
              Start date
              <DatePicker
                className="date-input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="start-date">
              End date
              <DatePicker
                className="date-input"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>

            <div className="button-Heat">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                disabled={!productSelect.value || !serviceSelectValue.value || !affiliateValue.value}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Grid container spacing={1}>
        <Grid item xs={12} md={20}>
          <div className={classes.dashedBorder}>
            <HeatMapTable dataShow={tableShow} data={response} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default HeatMap;
