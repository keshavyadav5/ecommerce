import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-sliece'


const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export default store