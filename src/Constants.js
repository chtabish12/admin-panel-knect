require("dotenv").config();
export const BASE_URL = process.env.REACT_APP_URL;
export const LOGIN_URL = `user/login`;
export const MAIN_DASHBOARD_URL = `dashboard/mainDashboard`;
export const REVENUE_URL = `user/revenue?`;
export const SERVICES_URL = `user/services`;
export const REPORTS_URL = `report/services?`;
export const AFFILIATES_URL = `report/affiliates`;
export const HEATMAP_URL = `report/heatMapReport?`;
export const MAIN_DASHBOARD_STARTDATE = `2018-01-01`;
export const OK = `OK`;
export const MAIN_DASHBOARD = `Main Dashboard`;
export const SUBMIT = `Submit`;
export const EXPORT_CSV = `Export CSV`;
export const PLATFORM_REVENUE = `Platform Revenue`;
export const YOY_GROWTH = `YoY Growth`;
export const REGIONAL_REVENUE = `Regional Revenue`;
export const OVERALL_OPERATOR_REVENUE = `Overall Operators Revenue`;
