// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  showCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} from "../Services/customerServices";

// Define an initial state
// const initialState = {
//   customer: [],
//   loading: false,
//   error: false
// };

// Create a slice of the Redux store
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetcustomer: (state, action) => {
      state.customer = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Show customer
      .addCase(showCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(showCustomer.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedcustomerId = action.payload._id;

        if (deletedcustomerId) {
          state.customer = state.customer.filter(
            (customer) => customer._id !== deletedcustomerId
          );
        }
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Update customer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        // Update the state with the new data
        state.customer = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false; // Set loading to false since the operation is complete
        state.error = action.payload;
      })
      // Show single customer
      .addCase(getSingleCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const { resetcustomer } = customerSlice.actions;
export default customerSlice.reducer;
