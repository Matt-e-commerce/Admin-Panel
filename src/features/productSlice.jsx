// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  showProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct
} from "../Services/productServices";

// Define an initial state
// const initialState = {
//   product: [],
//   loading: false,
//   error: false
// };

// Create a slice of the Redux store
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    resetProduct: (state, action) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
    fetchProductStart: (state) => {
      state.loading = true;
    },
    fetchProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      // Show Product
      .addCase(showProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(showProduct.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProductId = action.payload._id;

        if (deletedProductId) {
          state.product = state.product.filter(
            (product) => product._id !== deletedProductId
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Update the state with the new data
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false; // Set loading to false since the operation is complete
        state.error = action.payload;
      })
      // Show single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const {resetProduct ,fetchProductStart,fetchProductSuccess} = productSlice.actions;
export default productSlice.reducer;
