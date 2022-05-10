// import React, { useEffect, useState } from "react";
// import { Grid } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { Button, Card } from "react-bootstrap";
// import { AdminPanelService } from "../../Service/AdminPanelService";
// import Widget from "../../components/Widget/Widget";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { NO_DATA } from "../../helper/Helper";
// import PageTitle from "../../components/PageTitle/PageTitle";

// export default function PartnerDetailPage() {
//   const location = useLocation();
//   const [detailPageData, setDetailPageData] = useState();

//   useEffect(() => {
//     AdminPanelService.GetPartnerById(location.state)
//       .then((resp) => {
//         if (resp.statusText === "OK") {
//           setDetailPageData(resp.data);
//         } else {
//           toast(NO_DATA);
//         }
//       })
//       .catch((err) => toast(err));
//   }, [location.state]);
//   return (
//     <>
//       <Link
//         to={{ pathname: "partnersCMS" }}
//         className="table-name-href"
//         style={{ float: "right" }}
//       >
//         <Button>Go Back</Button>
//       </Link>
//       <PageTitle title="Partners Detail Page" />
//       <Grid container spacing={2}>
//         <Widget style={{ height: "77vh", width: "100%" }}>
//           <Grid item xs={12} md={12}>
//             {detailPageData && (
//               <Card className="text-left">
//                 <Card.Header>
//                   Name :{" "}
//                   <b>{detailPageData.name.toUpperCase().replaceAll('"', "")}</b>
//                 </Card.Header>
//                 <Card.Body>
//                   <Card.Title>
//                     Partner ID : <b>{detailPageData.id}</b>
//                   </Card.Title>
//                   <Card.Text>
//                     <div>
//                       Partner Username : <b>{detailPageData.username}</b>
//                     </div>
//                   </Card.Text>
//                   <Card.Text>
//                     <div>
//                       Partner Email : <b>{detailPageData.email}</b>
//                     </div>
//                   </Card.Text>
//                   <Card.Text>
//                     <div>
//                       Partner Password :{" "}
//                       <b>
//                         {detailPageData.password
//                           ? detailPageData.password
//                           : "null"}
//                       </b>
//                     </div>
//                   </Card.Text>
//                   <Card.Text>
//                     <div>
//                       Partner Phone :{" "}
//                       <b>
//                         {detailPageData.phone ? detailPageData.phone : "null"}
//                       </b>
//                     </div>
//                   </Card.Text>
//                 </Card.Body>
//                 <Card.Footer className="text-muted">
//                   <div>
//                     createdAt : <b>{detailPageData.createdAt}</b>
//                   </div>
//                   <div>
//                     updatedAt : <b>{detailPageData.updatedAt}</b>
//                   </div>
//                 </Card.Footer>
//               </Card>
//             )}
//           </Grid>
//         </Widget>
//       </Grid>
//     </>
//   );
// }
