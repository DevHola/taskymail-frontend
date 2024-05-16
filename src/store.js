import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/Authslice'
import mailSlice from "./slices/mailSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailSlice
    }
})
export default store;