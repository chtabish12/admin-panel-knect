import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";

// pages
import myRevenue from "../../pages/myRevenue/MyRevenue.js";
import MainDashboard from "../../pages/mainDashboard/MainDashboard.js";
import Services from "../../pages/services/Services.js";
import HeatMap from "../../pages/heatMap/HeatMap.js";
import Reports from "../../pages/reports/Reports.js";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            {/* <Route path="/app/Dashboard" component={MainDashboard} /> */}
            <Route path="/app/myRevenue" component={myRevenue} />
            <Route path="/app/services" component={Services} />
            <Route
              exact
              path="/app/reports"
              render={() => <Redirect to="/app/reports/service" />}
            />
            <Route path="/app/reports/service" component={Reports} />
            <Route path="/app/reports/heatmap" component={HeatMap} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
