import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';

const store = configureStore({
    reducer: {
        orderDetails: orderReducer
    }
})

export default store;