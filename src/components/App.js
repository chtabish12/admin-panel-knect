import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Layout from "./Layout/Layout.js";

// pages
import Error from "../pages/error/Error.js";
import Login from "../pages/login/Login.js";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  const [routePush, setRoutePush] = useState();
  const permissions = sessionStorage.getItem("user-permissions");
  useEffect(() => {
    if(permissions)
    if (permissions?.split(",").includes("Main Dashboard")) {
      setRoutePush("/app/Dashboard");
    } else if (permissions?.split(",").includes("My Revenue")) {
      setRoutePush("/app/myRevenue");
    }
  }, [setRoutePush, permissions]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <HashRouter>
        <Switch>
        <Route
            exact
            path="/"
            component={Login}
          />
          <Route
            exact
            path="/"
            render={() => <Redirect to={`"${routePush}"`}/>}
          />
          <Route
            exact
            path="/app"
            render={() => <Redirect to={`"${routePush}"`} exact />}
          />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/app" component={Layout} />
          <Route path="*" component={Error} />
        </Switch>
      </HashRouter>
    </>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
