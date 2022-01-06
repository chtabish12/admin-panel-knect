import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";

// pages
import Dashboard from "../../pages/dashboard/Dashboard.js";
import Services from "../../pages/services/Services.js";
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
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/services" component={Services} />
              <Route path="/app/reports" component={Reports} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
