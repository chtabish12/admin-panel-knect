// import React, { useState } from "react";
// import { Grid } from "@material-ui/core";
// // import { DataGrid } from "@mui/x-data-grid";
// import { AdminPanelService } from "../../Service/AdminPanelService";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { NO_DATA } from "../../helper/Helper";
// //
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Switch from '@material-ui/core/Switch';
// //
// // components
// // import PageTitle from "../../components/PageTitle";
// // import Widget from "../../components/Widget";

// // const datatableData = [
// //   ["Joe James", "Example Inc.", "Yonkers", "NY", "hj", "hhh"],
// //   ["John Walsh", "Example Inc.", "Hartford", "CT"],
// //   ["Bob Herm", "Example Inc.", "Tampa", "FL"],
// //   ["James Houston", "Example Inc.", "Dallas", "TX"],
// //   ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
// //   ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
// //   ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
// //   ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
// //   ["Meral Elias", "Example Inc.", "Hartford", "CT"],
// //   ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
// //   ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
// //   ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
// //   ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
// //   ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
// //   ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
// //   ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
// //   ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
// // ];

// export default function RedirectDetailPage() {
//   const location = useLocation();
//   const [detailPageData, setDetailPageData] = useState();
//   const [state, setState] = useState(0);
//   const handleChange = name => event => {
//     setState({ [name]: event.target.checked });
//    };
 
//   AdminPanelService.GetServiceById(location.state)
//     .then((resp) => {
//       if (resp.statusText === "OK") {
//         setDetailPageData(resp.data);
//       } else {
//         toast(NO_DATA);
//       }
//     })
//     .catch((err) => toast(err));
//   // const columns = [
//   //   { field: "id", headerName: "ID", width: 70 },
//   //   { field: "name", headerName: "Name", width: 130 },
//   //   { field: "status", headerName: "Status", width: 130 },
//   //   { field: "enablePurging", headerName: "enablePurging", width: 90 },
//   //   { field: "welcomeSMSEnabled", headerName: "welcomeSMSEnabled", width: 90 },
//   //   { field: "pricePoint", headerName: "pricePoint", width: 90 },
//   //   { field: "currency", headerName: "currency", width: 90 },
//   //   { field: "days", headerName: "days", width: 90 },
//   //   { field: "taxRate", headerName: "taxRate", width: 90 },
//   //   { field: "freeTrialDays", headerName: "freeTrialDays", width: 90 },
//   //   { field: "timezone", headerName: "timezone", width: 90 },
//   //   { field: "notificationUrl", headerName: "notificationUrl", width: 90 },
//   //   { field: "command", headerName: "command", width: 90 },
//   //   { field: "operatorId", headerName: "operatorId", width: 90 },
//   //   { field: "unsubUrl", headerName: "unsubUrl", width: 90 },
//   //   { field: "frequency", headerName: "frequency", width: 90 },
//   //   { field: "serviceUrl", headerName: "serviceUrl", width: 90 },
//   //   { field: "sdpid", headerName: "sdpid", width: 90 },
//   //   { field: "servicePassword", headerName: "servicePassword", width: 90 },
//   //   { field: "host", headerName: "host", width: 90 },
//   //   { field: "onDemand", headerName: "onDemand", width: 90 },
//   //   { field: "aggregatorId", headerName: "aggregatorId", width: 90 },
//   //   { field: "companyId", headerName: "companyId", width: 90 },
//   //   { field: "connectionType", headerName: "connectionType", width: 90 },
//   //   { field: "serviceKey", headerName: "serviceKey", width: 90 },
//   //   { field: "makOperatorId", headerName: "makOperatorId", width: 90 },
//   //   { field: "chargeCycle", headerName: "chargeCycle", width: 90 },
//   //   { field: "ssid", headerName: "ssid", width: 90 },
//   //   { field: "cancelKeyword", headerName: "cancelKeyword", width: 90 },
//   //   { field: "ChargeWith", headerName: "ChargeWith", width: 90 },
//   //   { field: "allocatedTPS", headerName: "allocatedTPS", width: 90 },
//   //   { field: "shortCode", headerName: "shortCode", width: 90 },
//   //   { field: "channelId", headerName: "channelId", width: 90 },
//   //   { field: "keyword", headerName: "keyword", width: 90 },
//   //   { field: "aliasName", headerName: "aliasName", width: 90 },
//   //   { field: "shortName", headerName: "shortName", width: 90 },
//   //   { field: "onDemandSms", headerName: "onDemandSms", width: 90 },
//   //   { field: "otpBypass", headerName: "otpBypass", width: 90 },
//   //   { field: "initialPrice", headerName: "initialPrice", width: 90 },
//   //   { field: "otpEnabled", headerName: "otpEnabled", width: 90 },
//   //   { field: "installmentTPS", headerName: "installmentTPS", width: 90 },
//   //   { field: "renChargingCommand", headerName: "renChargingCommand", width: 90 },
//   //   // {
//   //   //   field: "fullName",
//   //   //   headerName: "Full name",
//   //   //   description: "This column has a value getter and is not sortable.",
//   //   //   sortable: false,
//   //   //   width: 160,
//   //   //   valueGetter: (params) =>
//   //   //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   //   // },
//   // ];

//   // const rows = [
//   //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   // ];
//   return (
//     <>
//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           {/* <div style={{ height: 400, width: "100%" }}>
//             <DataGrid
//               rows={detailPageData}
//               columns={columns}
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//             />
//           </div> */}
//           {/* <div>{detailPageData}</div> */}

//           <FormControl component="fieldset">
//         <FormLabel component="legend">Assign responsibility</FormLabel>
//         <FormGroup>
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={this.state.gilad}
//                 onChange={this.handleChange('gilad')}
//                 value="gilad"
//               />
//             }
//             label="Gilad Gray"
//           />
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={this.state.jason}
//                 onChange={this.handleChange('jason')}
//                 value="jason"
//               />
//             }
//             label="Jason Killian"
//           />
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={this.state.antoine}
//                 onChange={this.handleChange('antoine')}
//                 value="antoine"
//               />
//             }
//             label="Antoine Llorca"
//           />
//         </FormGroup>
//         <FormHelperText>Be careful</FormHelperText>
//       </FormControl>
//         </Grid>
//       </Grid>
//     </>
//   );
// }
