// import React, { useEffect, useState } from "react";
// import { Grid } from "@material-ui/core";
// import { AdminPanelService } from "../../Service/AdminPanelService";
// import { RotatingLines } from "react-loader-spinner";
// import { NO_DATA } from "../../helper/Helper";
// import { toast } from "react-toastify";
// import Users from "../../components/CmsComponents/Users";

// const UserCMS = () => {
//   // Setting state
//   const [initialTableData, setInitialTableData] = useState();
//   const [editing, setEditing] = useState(false);
//   const [formShow, setFormShow] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowCounts, setRowCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = () => {
//     setIsLoading(true);
//     AdminPanelService.AllUsers(page)
//       .then((resp) => {
//         setRowCount(resp.data.count);
//         // eslint-disable-next-line
//         if (resp.statusText == "OK" && resp.data.users.length) {
//           setInitialTableData(resp.data.users);
//           setIsLoading(false);
//         } else {
//           toast(NO_DATA);
//         }
//       })
//       .catch((err) => toast(err));
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line
//   }, [setPage, page, setFormShow]);

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={12}>
//           {initialTableData && (
//             <Users
//               headerTable={"Users"}
//               editing={editing}
//               setEditing={setEditing}
//               formShow={formShow}
//               setFormShow={setFormShow}
//               initialTableData={initialTableData}
//               setInitialTableData={setInitialTableData}
//               page={page}
//               setPage={setPage}
//               rowCounts={rowCounts}
//               isLoading={isLoading}
//             />
//           )}
//           {isLoading && (
//             <div className="spinner" style={{ marginTop: "30vh" }}>
//               <RotatingLines width="100" strokeColor="#536DFE" />
//             </div>
//           )}
//         </Grid>
//       </Grid>
//     </>
//   );
// };
// export default UserCMS;
