import {
  BASE_URL,
  LOGIN_URL,
  MAIN_DASHBOARD_URL,
  REVENUE_URL,
  SERVICES_URL,
  REPORTS_URL,
  AFFILIATES_URL,
  HEATMAP_URL,
  ALL_PRODUCTS,
  ADD_PRODUCTS,
  UPDATE_PRODUCTS,
  ALL_PARTNERS,
  ALL_SERVICES,
  BLOCK_SERVICE,
  ADD_SERVICE,
  UPDATE_SERVICE,
  GET_SERVICE_BY_ID,
  PARTNER_ALL,
  GET_PARTNER_BY_ID,
  ADD_PARTNER,
  OPERATOR_ALL,
  GET_OPERATOR_BY_ID,
  ADD_OPERATOR,
  EDIT_PARTNER,
  EDIT_Operator,
  ALL_COUNTRIES,
  ADD_COUNTRY,
  EDIT_COUNTRY,
  GET_COUNTRY_BY_ID,
  ALL_ADMIN_USERS,
  ADD_ADMIN_USER,
  EDIT_ADMIN_USER,
  ALL_USERS,
  GET_USER_BY_ID,
  GET_ADMIN_USER_BY_ID,
  ADD_USER,
  EDIT_USER,
  GET_PRODUCT_BY_ID
} from "../Constants";
import axios from "axios";
export const AdminPanelService = {
  Login: async (request) => {
    // console.log("URL", BASE_URL)
    const url = `${BASE_URL}${LOGIN_URL}`;
    return axios.post(url, request);
  },
  MainDashBoard: async (productIds, startDate, endDate, interval, region) => {
    const url = `${BASE_URL}${MAIN_DASHBOARD_URL}`;

    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
      params: {
        productIds: `${productIds}`,
        startDate: `${startDate}`,
        endDate: `${endDate}`,
        interval: `${interval}`,
        region: region.includes(",") ? region.split(",") : region,
      },
    });
  },

  MyRevenue: async (startDate, endDate, productIds, serviceIds, region) => {
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
  AllProducts: async () => {
    const url = `${BASE_URL}${ALL_PRODUCTS}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddProducts: async (request) => {
    const url = `${BASE_URL}${ADD_PRODUCTS}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetProductById: async (id) => {
    const url = `${BASE_URL}${GET_PRODUCT_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdateProducts: async (id, request) => {
    const url = `${BASE_URL}${UPDATE_PRODUCTS}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },

  AllPartners: async () => {
    const url = `${BASE_URL}${ALL_PARTNERS}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AllServices: async () => {
    const url = `${BASE_URL}${ALL_SERVICES}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  BlockService: async (id, request) => {
    const url = `${BASE_URL}${BLOCK_SERVICE}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddService: async (request) => {
    const url = `${BASE_URL}${ADD_SERVICE}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdateService: async (id, request) => {
    const url = `${BASE_URL}${UPDATE_SERVICE}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetServiceById: async (id) => {
    const url = `${BASE_URL}${GET_SERVICE_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AllPartnersData: async () => {
    const url = `${BASE_URL}${PARTNER_ALL}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetPartnerById: async (id) => {
    const url = `${BASE_URL}${GET_PARTNER_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddPartner: async (request) => {
    const url = `${BASE_URL}${ADD_PARTNER}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdatePartner: async (id, request) => {
    const url = `${BASE_URL}${EDIT_PARTNER}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AllOperators: async () => {
    const url = `${BASE_URL}${OPERATOR_ALL}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetOperatorById: async (id) => {
    const url = `${BASE_URL}${GET_OPERATOR_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddOperator: async (request) => {
    const url = `${BASE_URL}${ADD_OPERATOR}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdateOperator: async (id, request) => {
    const url = `${BASE_URL}${EDIT_Operator}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AllCountries: async () => {
    const url = `${BASE_URL}${ALL_COUNTRIES}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetCountryById: async (id) => {
    const url = `${BASE_URL}${GET_COUNTRY_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddCountry: async (request) => {
    const url = `${BASE_URL}${ADD_COUNTRY}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdateCountry: async (id, request) => {
    const url = `${BASE_URL}${EDIT_COUNTRY}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AllAdminUsers: async () => {
    const url = `${BASE_URL}${ALL_ADMIN_USERS}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetAdminUserById: async (id) => {
    const url = `${BASE_URL}${GET_ADMIN_USER_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddAdminUser: async (request) => {
    const url = `${BASE_URL}${ADD_ADMIN_USER}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdateAdminUser: async (id, request) => {
    const url = `${BASE_URL}${EDIT_ADMIN_USER}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AllUsers: async () => {
    const url = `${BASE_URL}${ALL_USERS}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  GetUserById: async (id) => {
    const url = `${BASE_URL}${GET_USER_BY_ID}${id}`;
    return axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  AddUser: async (request) => {
    const url = `${BASE_URL}${ADD_USER}`;
    return axios.post(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
  UpdateUser: async (id, request) => {
    const url = `${BASE_URL}${EDIT_USER}${id}`;
    return axios.put(url, request, {
      headers: {
        token: sessionStorage.getItem("token-user"),
      },
    });
  },
};
