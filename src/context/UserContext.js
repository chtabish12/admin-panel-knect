import React from "react";
import { useDispatch } from "react-redux";
import { filtersAction } from "../store/filtersData";
const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!sessionStorage.getItem("id_token"),
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

//////////////////////##FILTER METHOD###/////////////////////
const FilterFunction = (
  productArray,
  productSelect,
  serviceArray,
  serviceSelectValue,
  HeatmapFilterShow,
  ReportFlag,
  ChartBarShow,
  prodIndex,
  servIndex
) => {
  const dispatch = useDispatch();
  const LoginApiResp = JSON.parse(localStorage.getItem("api-data"));
  if (ChartBarShow) {
    for (let x = 0; x < LoginApiResp[prodIndex].products.length; x++) {
      productArray.push({
        value: LoginApiResp[prodIndex].products[x].id,
        label: LoginApiResp[prodIndex].products[x].name,
      });
    }
    for (
      let i = 0;
      i < LoginApiResp[servIndex].products[0].services.length;
      i++
    ) {
      serviceArray.push({
        value: LoginApiResp[servIndex].products[0].services[i].id,
        label: LoginApiResp[servIndex].products[0].services[i].name,
      });
    }
  }
  // Product array data for displaying dropdown
  else {
    for (let i = 0; i < LoginApiResp.length; i++)
      for (let x = 0; x < LoginApiResp[i].products.length; x++) {
        productArray.push({
          value: LoginApiResp[i].products[x].id,
          label: LoginApiResp[i].products[x].name,
        });
      }
  }
  // Service array data for displaying dropdown
  if (productSelect) {
    for (let x = 0; x < LoginApiResp.length; x++) {
      for (let y = 0; y < LoginApiResp[x].products.length; y++)
        for (let z = 0; z < LoginApiResp[x].products[y].services.length; z++) {
          if (
            LoginApiResp[x].products[y].services[z].productId ===
              productSelect.value &&
            HeatmapFilterShow
          ) {
            serviceArray.push({
              value: LoginApiResp[x].products[y].services[z].id,
              label: LoginApiResp[x].products[y].services[z].name,
            });
          } else if (productSelect.length && ReportFlag)
            for (let j = 0; j < productSelect.length; j++)
              if (
                LoginApiResp[x].products[y].services[z].productId ===
                productSelect[j].value
              ) {
                serviceArray.push({
                  ...serviceArray,
                  value: LoginApiResp[x].products[y].services[z].id,
                  label: LoginApiResp[x].products[y].services[z].name,
                });
              }
        }
    }
  }
  const productArrayValue = [];
  const serviceArrayValue = [];
  if (HeatmapFilterShow) {
    dispatch(filtersAction.serviceSet(serviceSelectValue.value));
  } else if (ReportFlag || ChartBarShow) {
    for (let x = 0; x < productSelect.length; x++) {
      productArrayValue.push(productSelect[x].value);
    }
    for (let x = 0; x < serviceSelectValue.length; x++) {
      serviceArrayValue.push(serviceSelectValue[x].value);
    }
    localStorage.setItem("product-data", productArrayValue.join(","));
    localStorage.setItem("service-data", serviceArrayValue.join(","));
    dispatch(filtersAction.productSet(productArrayValue.join(",")));
    dispatch(filtersAction.serviceSet(serviceArrayValue.join(",")));
  }
};
//////////////////////##LOGIN METHOD###/////////////////////
const loginUser = (dispatch, history, setIsLoading, message) => {
  if (message === 200) {
    sessionStorage.setItem("id_token", 1);
    setIsLoading(true);
    dispatch({ type: "LOGIN_SUCCESS" });
    history.push("/app/dashboard");
  } else if (message === 400) {
    setIsLoading(false);
  }
};
//////////////////////##LOGOUT METHOD###/////////////////////
const signOut = (dispatch, history) => {
  sessionStorage.removeItem("id_token");
  sessionStorage.removeItem("token-user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
  sessionStorage.clear();
  localStorage.clear();
};

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  FilterFunction,
  loginUser,
  signOut,
};
