import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedServices: [],     // From context or selection step
  finalOrder: null          // Final merged data when user clicks "Submit"
};

const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addSelectedServices: (state, action) => {
      state.selectedServices = action.payload;
    },

    setFinalOrderDetails: (state, action) => {
      state.finalOrder = {
        ...action.payload,
        submittedAt: Date.now()
      };
    },

    resetOrderDetails: () => initialState
  }
});

export const {
  addSelectedServices,
  setFinalOrderDetails,
  resetOrderDetails
} = orderSlice.actions;

export default orderSlice.reducer;
