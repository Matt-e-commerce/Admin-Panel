// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  showCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../Services/categoryServices";

// Define an initial state
// const initialState = {
//   category: [],
//   loading: false,
//   error: false
// };

// Create a slice of the Redux store
const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    resetCategory: (state, action) => {
      state.category = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      // Show category
      .addCase(showCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(showCategory.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deletedcategoryId = action.payload._id;

        if (deletedcategoryId) {
          state.category = state.category.filter(
            (category) => category._id !== deletedcategoryId
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        // Update the state with the new data
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false; // Set loading to false since the operation is complete
        state.error = action.payload;
      })
      // Show single category
      .addCase(getSingleCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const {resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
