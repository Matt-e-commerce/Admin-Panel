// slices/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { showWhishList } from "../Services/whishListServices";

// Create a slice of the Redux store
const whishlistSlice = createSlice({
  name: "whislist",
  initialState: {
    whishlist: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    resetwhishlist: (state, action) => {
      state.whishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Show whishlist
      .addCase(showWhishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(showWhishList.fulfilled, (state, action) => {
        state.loading = false;
        state.whishlist = action.payload;
      })
      .addCase(showWhishList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

// Export the async thunk for use in components

// Export the reducer for use in store configuration
export const { resetwhishlist } = whishlistSlice.actions;
export default whishlistSlice.reducer;
