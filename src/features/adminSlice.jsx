// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    updateProfileAdmin,
    getSingleAdmin
} from "../Services/adminServices";

// Define an initial state
// const initialState = {
//   admin: [],
//   loading: false,
//   error: false
// };

// Create a slice of the Redux store
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    resetadmin: (state, action) => {
      state.admin = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
   
      // Update admin
      .addCase(updateProfileAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfileAdmin.fulfilled, (state, action) => {
        // Update the state with the new data
        state.admin = action.payload;
      })
      .addCase(updateProfileAdmin.rejected, (state, action) => {
        state.loading = false; // Set loading to false since the operation is complete
        state.error = action.payload;
      })
      // Show single admin
      .addCase(getSingleAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getSingleAdmin.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const {resetadmin } = adminSlice.actions;
export default adminSlice.reducer;
