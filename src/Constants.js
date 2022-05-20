require("dotenv").config();
export const BASE_URL = process.env.REACT_APP_URL;
export const PERMISSIONS = [
  { name: "Main Dashboard", id: 1 },
  { name: "My Revenue", id: 2 },
  { name: "My Services", id: 3 },
  { name: "Service wise", id: 4 },
  { name: "Services HeatMap", id: 5 },
  { name: "Administration", id: 6 },
  // { name: "Users", id: 7 },
  { name: "Admin Users", id: 7 },
  { name: "Products", id: 8 },
  { name: "Services", id: 9 },
  { name: "Partners", id: 10 },
  { name: "Operator", id: 11 },
  { name: "Country", id: 12 },
];
export const LOGIN_URL = `user/login`;
export const MAIN_DASHBOARD_URL = `dashboard/mainDashboard`;
export const REVENUE_URL = `user/revenue?`;
export const SERVICES_URL = `user/services`;
export const REPORTS_URL = `report/services?`;
export const AFFILIATES_URL = `report/affiliates`;
export const HEATMAP_URL = `report/heatMapReport?`;
export const MAIN_DASHBOARD_STARTDATE = `2018-01-01`;
export const OK = `OK`;
export const MAIN_DASHBOARD = `Dashboard`;
export const SUBMIT = `Submit`;
export const EXPORT_CSV = `Export CSV`;
export const PLATFORM_REVENUE = `Platform Revenue`;
export const YOY_GROWTH = `YoY Growth`;
export const REGIONAL_REVENUE = `Regional Revenue`;
export const OVERALL_OPERATOR_REVENUE = `Overall Operators Revenue`;
export const ALL_PRODUCTS = `product/all`;
export const PRODUCTS = `product`;
export const ADD_PRODUCTS = `product/add`;
export const GET_PRODUCT_BY_ID = `product/`;
export const UPDATE_PRODUCTS = `product/edit/`;
export const ALL_PARTNERS = `partner/all`;
export const PARTNERS = `partner`;
export const ALL_SERVICES = `service/all`;
export const SERVICES = `service`;
export const BLOCK_SERVICE = `service/block/`;
export const ADD_SERVICE = `service/add`;
export const UPDATE_SERVICE = `service/edit/`;
export const GET_SERVICE_BY_ID = `service/`;
export const GET_PARTNER_BY_ID = `partner/`;
export const ADD_PARTNER = `partner/add`;
export const EDIT_PARTNER = `partner/edit/`;
export const OPERATOR_ALL = `operator/all`;
export const OPERATOR = `operator`;
export const GET_OPERATOR_BY_ID = `operator/`;
export const ADD_OPERATOR = `operator/add`;
export const EDIT_Operator = `operator/edit/`;
export const ALL_COUNTRIES = `country/all`;
export const COUNTRIES = `country`;
export const GET_COUNTRY_BY_ID = `country/`;
export const ADD_COUNTRY = `country/add`;
export const EDIT_COUNTRY = `country/edit/`;
export const ALL_ADMIN_USERS = `user/admin/all`;
export const GET_ADMIN_USER_BY_ID = `user/admin/`;
export const ADD_ADMIN_USER = `user/admin/add`;
export const EDIT_ADMIN_USER = `user/admin/edit/`;
export const ALL_USERS = `user/all`;
export const GET_USER_BY_ID = `user/`;
export const ADD_USER = `user/add`;
export const EDIT_USER = `user/edit/`;
