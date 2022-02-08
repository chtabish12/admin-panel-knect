import { configureStore } from "@reduxjs/toolkit";

import FiltersIDReducer from "./filtersData";

const store = configureStore({
  reducer: { filtersData: FiltersIDReducer },
});

export default store;
