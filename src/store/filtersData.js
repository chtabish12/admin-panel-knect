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
    regionsSet(state, action) {
      state.regionsSet = action.payload;
    },
    intervalSet(state, action) {
      state.intervalSet = action.payload;
    },
    startDateSet(state, action) {
      state.startDateSet = action.payload;
    },
    endDateSet(state, action) {
      state.endDateSet = action.payload;
    },
    regionSet(state, action) {
      state.regionSet = action.payload;
    },
  },
});

export const filtersAction = FiltersIDReducer.actions;

export default FiltersIDReducer.reducer;
