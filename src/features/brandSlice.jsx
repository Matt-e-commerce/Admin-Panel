// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    createBrand,
    showBrand,
    getSingleBrand,
    updateBrand,
    deleteBrand
} from "../Services/brandServices";

// Define an initial state
// const initialState = {
//   brand: [],
//   loading: false,
//   error: false
// };

// Create a slice of the Redux store
const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brand: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    resetbrand: (state, action) => {
      state.brand = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create brand
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      // Show brand
      .addCase(showBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(showBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload;
      })
      .addCase(showBrand.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Delete brand
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        const deletedbrandId = action.payload._id;

        if (deletedbrandId) {
          state.brand = state.brand.filter(
            (brand) => brand._id !== deletedbrandId
          );
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Update brand
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        // Update the state with the new data
        state.brand = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false; // Set loading to false since the operation is complete
        state.error = action.payload;
      })
      // Show single brand
      .addCase(getSingleBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload;
      })
      .addCase(getSingleBrand.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const {resetbrand } = brandSlice.actions;
export default brandSlice.reducer;
