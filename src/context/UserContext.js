import React from "react";

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
  FiltersDisplay,
  ReportFlag,
  ChartBarShow,
  prodIndex,
  servIndex
) => {
  const LoginApiResp = JSON.parse(localStorage.getItem("api-data"));
  if (ChartBarShow) {
    const ApiData = JSON.parse(localStorage.getItem("api-data"));
    for (let x = 0; x < ApiData[prodIndex].products.length; x++) {
      productArray.push({
        value: ApiData[prodIndex].products[x].id,
        label: ApiData[prodIndex].products[x].name,
      });
    }
    for (let i = 0; i < ApiData[servIndex].products[0].services.length; i++) {
      serviceArray.push({
        value: ApiData[servIndex].products[0].services[i].id,
        label: ApiData[servIndex].products[0].services[i].name,
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
            FiltersDisplay
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
  if (FiltersDisplay) {
    localStorage.setItem("service-data", serviceSelectValue.value);
  } else if (ReportFlag || ChartBarShow) {
    let productArrayValue = [];
    let serviceArrayValue = [];
    for (let x = 0; x < productSelect.length; x++) {
      productArrayValue.push(productSelect[x].value);
    }
    for (let x = 0; x < serviceSelectValue.length; x++) {
      serviceArrayValue.push(serviceSelectValue[x].value);
    }
    localStorage.setItem("product-data", productArrayValue.join(","));
    localStorage.setItem("service-data", serviceArrayValue.join(","));
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
