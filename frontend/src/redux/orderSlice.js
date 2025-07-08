import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedServices: [],
    selectedPlan: {}
  };

const orderSlice = createSlice({
    name: "orderDetials",
    initialState,
    reducers: {
        addSelectedServices: (state, action) => {
          // filter empty entries before setting this
          state.selectedServices = action.payload;
        },
      
        addSelectedPlan: (state, action) => {
          state.selectedPlan = {
            ...action.payload,
            timestamp: Date.now()
          };
        },
      
        resetOrderDetails: () => initialState
      }
})

export const { addSelectedServices, addSelectedPlan, resetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;