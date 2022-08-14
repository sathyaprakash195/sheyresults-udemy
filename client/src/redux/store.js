import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alerts";
import { employeeSlice } from "./employees";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  employee: employeeSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;