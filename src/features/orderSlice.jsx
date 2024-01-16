// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    getSingleOrder,
    showOrder,
    createOrder,
    updateOrder,
    deleteOrder
} from "../Services/orderServices";

// Define an initial state
// const initialState = {
//   order: [],
//   loading: false,
//   error: false
// };

// Create a slice of the Redux store
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
   
    resetorder: (state, action) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
   
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      // Show order
      .addCase(showOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(showOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(showOrder.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        const deletedOrderId = action.payload?._id;
      
        if (deletedOrderId) {
          state.order = state.order.filter((order) => order._id !== deletedOrderId);
        }
      })
      
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Update order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        // Update the state with the new data
        state.order = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false; // Set loading to false since the operation is complete
        state.error = action.payload;
      })
      // Show single order
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const {resetorder } = orderSlice.actions;
export default orderSlice.reducer;
