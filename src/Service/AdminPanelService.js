import { BASE_URL } from "../Constants";
import axios from "axios";
export const AdminPanelService = {
  Login: async (request) => {
    const url = `${BASE_URL}user/login`;
    return axios.post(url, request);
  },
  DashBoard: async (startDate, endDate, productIds, serviceIds, region) => {
    const url = `${BASE_URL}user/revenue?`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
      params: {
        startDate: `${startDate}`,
        endDate: `${endDate}`,
        productIds: `${productIds}`,
        serviceIds: `${serviceIds}`,
        region: `${region}`,
      },
    });
  },
  Service: async () => {
    const url = `${BASE_URL}user/services`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  Reporting: async (serviceId, startDate, endDate, productIds) => {
    const url = `${BASE_URL}report/services?`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
      params: {
        serviceIds: `${serviceId}`,
        startDate: `'${startDate}'`,
        endDate: `'${endDate}'`,
        productIds: `${productIds}`,
      },
    });
  },
  HeatMapAffiliates: async () => {
    const url = `${BASE_URL}report/affiliates`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  HeatMapTable: async (serviceId, startDate, endDate, affiliateId) => {
    const url = `${BASE_URL}report/heatMapReport?`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
      params: {
        serviceId,
        startDate,
        endDate,
        affiliateId,
      },
    });
  },
};
