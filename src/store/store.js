import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice"
import authReducer from "./authSlice"

const store = configureStore({
   reducer: {
        application: applicationReducer,
        auth: authReducer
   }
})

export default store