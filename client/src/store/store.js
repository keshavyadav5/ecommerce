import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-sliece'
import AdminProductsSlice from './admin/product-slice/index'


const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts : AdminProductsSlice
  }
})

export default store