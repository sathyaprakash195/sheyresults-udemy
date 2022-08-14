import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: null,
  },
  reducers: {
    SetEmployee: (state, action) => {
      state.employee = action.payload;
    },
  },
});

export const { SetEmployee } = employeeSlice.actions;
