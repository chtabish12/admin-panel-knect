import {
  BASE_URL,
  LOGIN_URL,
  REVENUE_URL,
  SERVICES_URL,
  REPORTS_URL,
  AFFILIATES_URL,
  HEATMAP_URL,
} from "../Constants";
import axios from "axios";
export const AdminPanelService = {
  Login: async (request) => {
    const url = `${BASE_URL}${LOGIN_URL}`;
    return axios.post(url, request);
  },
  DashBoard: async (startDate, endDate, productIds, serviceIds, region) => {
    const url = `${BASE_URL}${REVENUE_URL}`;
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
    const url = `${BASE_URL}${SERVICES_URL}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  Reporting: async (serviceId, startDate, endDate, productIds) => {
    const url = `${BASE_URL}${REPORTS_URL}`;
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
    const url = `${BASE_URL}${AFFILIATES_URL}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  HeatMapTable: async (serviceId, startDate, endDate, affiliateId) => {
    const url = `${BASE_URL}${HEATMAP_URL}`;
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
