require("dotenv").config();
export const BASE_URL = process.env.REACT_APP_URL;
export const LOGIN_URL = `user/login`;
export const REVENUE_URL = `user/revenue?`;
export const SERVICES_URL = `user/services`;
export const REPORTS_URL = `report/services?`;
export const AFFILIATES_URL = `report/affiliates`;
export const HEATMAP_URL = `report/heatMapReport?`;
