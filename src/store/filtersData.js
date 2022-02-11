import { createSlice } from "@reduxjs/toolkit";

const initialValues = {};

const FiltersIDReducer = createSlice({
  name: "filtersData",
  initialState: initialValues,
  reducers: {
    productSet(state, action) {
      state.productSet = action.payload;
    },
    serviceSet(state, action) {
      state.serviceSet = action.payload;
    },
  },
});

export const filtersAction = FiltersIDReducer.actions;

export default FiltersIDReducer.reducer;
