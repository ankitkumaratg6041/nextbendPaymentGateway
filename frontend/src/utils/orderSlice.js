import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orderDetials",
    initialState: {
        selectedServices: [],
        selectedPlan: {
            planName: "",
            price: null,
            features: [],
            timestamp: null
        }
    },
    reducers: {
        addSelectedServices: (state, action) => {
            
            
        }
    }

})