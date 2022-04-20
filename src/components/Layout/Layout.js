import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import {
  Home as HomeIcon,
  ViewQuilt,
  BusinessCenter,
  FilterNone as UIElementsIcon,
  AccountBox,
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
import AdminCMS from "../../pages/CMS/AdminCMS";
import PartnersCMS from "../../pages/CMS/PartnersCMS";
import ProductsCMS from "../../pages/CMS/ProductsCMS";
import ServicesCMS from "../../pages/CMS/ServicesCMS";
import UserCMS from "../../pages/CMS/UserCMS";
import OperatorCMS from "../../pages/CMS/OperatorCMS";
import CountryCMS from "../../pages/CMS/CountryCMS";
import AdminUserDetailPage from "../../pages/detailPage/AdminUserDetailPage.js";

// context
import { useLayoutState } from "../../context/LayoutContext";
import UserDetailPage from "../../pages/detailPage/UserDetailPage";
import ProductDetailPage from "../../pages/detailPage/ProductDetailPage";
import PartnerDetailPage from "../../pages/detailPage/PartnerDetailPage";
import OperatorsDetailPage from "../../pages/detailPage/OperatorsDetailPage";
import CountryDetailPage from "../../pages/detailPage/CountryDetailPage";
import ServicesDetailsPage from "../../pages/detailPage/ServicesDetailsPage";

function Layout(props) {
  const classes = useStyles();
  const permissions = sessionStorage.getItem("user-permissions").split(",");
  // console.log(permissions);
  let structure = [];
  let componentShow = [];
  let reportingSubMenus = {
    id: 3,
    label: "Reporting",
    link: "/app/reports",
    icon: <UIElementsIcon />,
    children: [],
  };
  let administrationSubMenus = {
    id: 4,
    label: "Administration",
    link: "/app/administration",
    icon: <AccountBox />,
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
    if (ele === "Admin Users") {
      administrationSubMenus.children.push({
        label: "Admin Users",
        link: "/app/administration/adminUsersCMS",
        component: <AdminCMS />,
      });
    }
    if (ele === "Users") {
      administrationSubMenus.children.push({
        label: "Users CMS",
        link: "/app/administration/usersCMS",
        component: <UserCMS />,
      });
    }
    if (ele === "Products") {
      administrationSubMenus.children.push({
        label: "Products CMS",
        link: "/app/administration/productsCMS",
        component: <ProductsCMS />,
      });
    }
    if (ele === "Services") {
      administrationSubMenus.children.push({
        label: "Services CMS",
        link: "/app/administration/servicesCMS",
        component: <ServicesCMS />,
      });
    }
    if (ele === "Partners") {
      administrationSubMenus.children.push({
        label: "Partners CMS",
        link: "/app/administration/partnersCMS",
        component: <PartnersCMS />,
      });
    }
    if (ele === "Operator") {
      administrationSubMenus.children.push({
        label: "Operator CMS",
        link: "/app/administration/operatorsCMS",
        component: <OperatorCMS />,
      });
    }
    if (ele === "Country") {
      administrationSubMenus.children.push({
        label: "Country CMS",
        link: "/app/administration/countryCMS",
        component: <CountryCMS />,
      });
    }
  });
  structure.push(reportingSubMenus);
  structure.push(administrationSubMenus);
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
              {componentShow.map((state, id) => (
                <Route key={id} path={state.link}>
                  {state.component}
                </Route>
              ))}
              <Route
                exact
                path="/app/reports"
                render={() => <Redirect to="/app/reports/service" />}
              />
              {reportingSubMenus.children.map((reports, id) => (
                <Route key={id} path={reports.link}>
                  {reports.component}
                </Route>
              ))}
              <Route
                exact
                path="/app/administration"
                render={() => <Redirect to="/app/administration" />}
              />
              {administrationSubMenus.children.map((cms, id) => (
                <Route key={id} path={cms.link}>
                  {cms.component}
                </Route>
              ))}
              <Route path="/app/administration/AdminUserDetailPage">
                <AdminUserDetailPage />
              </Route>
              <Route path="/app/administration/userDetailPage">
                <UserDetailPage />
              </Route>
              <Route path="/app/administration/productDetailPage">
                <ProductDetailPage />
              </Route>
              <Route path="/app/administration/partnersDetailPage">
                <PartnerDetailPage />
              </Route>
              <Route path="/app/administration/operatorsDetailPage">
                <OperatorsDetailPage />
              </Route>
              <Route path="/app/administration/countriesDetailPage">
                <CountryDetailPage />
              </Route>
              <Route path="/app/administration/servicesDetailPage">
                <ServicesDetailsPage />
              </Route>
            </>
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
