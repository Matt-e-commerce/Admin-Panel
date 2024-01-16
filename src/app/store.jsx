import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import categoryReducer from "../features/categorySlice";
import brandReducer from "../features/brandSlice";
import orderReducer from "../features/orderSlice";
import customerReducer from "../features/customerSlice";
import whishlistReducer from "../features/wishListSlice";
import adminReducer from "../features/adminSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
    order: orderReducer,
    customer: customerReducer,
    whislist: whishlistReducer,
    admin: adminReducer,
  },
});
