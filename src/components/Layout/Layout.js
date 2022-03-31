import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import {
  Home as HomeIcon,
  ViewQuilt,
  BusinessCenter,
  FilterNone as UIElementsIcon,
  // MapIcon
} from "@material-ui/icons";
// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";

// pages
import MyRevenue from "../../pages/myRevenue/MyRevenue.js";
import MainDashboard from "../../pages/mainDashboard/MainDashboard.js";
import Services from "../../pages/services/Services.js";
import HeatMap from "../../pages/heatMap/HeatMap.js";
import Reports from "../../pages/reports/Reports.js";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();
  const permissions = sessionStorage.getItem("user-permissions").split(",");
  let structure = [];
  let componentShow = [];
  let reportingSubMenus = {
    id: 3,
    label: "Reporting",
    link: "/app/reports",
    icon: <UIElementsIcon />,
    children: [],
  };
  permissions?.forEach((ele) => {
    // eslint-disable-next-line
    switch (ele) {
      case "Main Dashboard":
        structure.push({
          id: 0,
          label: "Dashboard",
          link: "/app/Dashboard",
          icon: <HomeIcon />,
        });
        componentShow.push({
          id: 0,
          link: "/app/Dashboard",
          component: <MainDashboard />,
        });
        break;
      case "My Revenue":
        structure.push({
          id: 1,
          label: "My Revenue",
          link: "/app/myRevenue",
          icon: <ViewQuilt />,
        });
        componentShow.push({
          id: 1,
          link: "/app/myRevenue",
          component: <MyRevenue />,
        });
        break;
      case "My Services":
        structure.push({
          id: 2,
          label: "My Services",
          link: "/app/services",
          icon: <BusinessCenter />,
        });
        componentShow.push({
          id: 2,
          link: "/app/services",
          component: <Services />,
        });
        break;
    }
    if (ele === "Service wise") {
      reportingSubMenus.children.push({
        label: "Service wise",
        link: "/app/reports/service",
        component: <Reports />,
      });
    }
    if (ele === "Services HeatMap") {
      reportingSubMenus.children.push({
        label: "Services HeatMap",
        link: "/app/reports/heatmap",
        component: <HeatMap />,
      });
    }
  });
  structure.push(reportingSubMenus);
  // global
  const layoutState = useLayoutState();
  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar structure={structure} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <>
              {componentShow.map((state) => (
                <Route path={state.link}>{state.component}</Route>
              ))}
              <Route
                exact
                path="/app/reports"
                render={() => <Redirect to="/app/reports/service" />}
              />
              {reportingSubMenus.children.map((reports) => (
                <Route path={reports.link}>{reports.component}</Route>
              ))}
            </>
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
