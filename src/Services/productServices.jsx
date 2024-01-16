import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
// const url link
const POST_URL = "https://e-commerce-qubi.vercel.app";
// Function to get the authorization token from local storage
const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem('token');
};
// create Product
export const createProduct = createAsyncThunk("createProduct", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const formData = new FormData();
   // Logging variations for troubleshooting

  //  console.log("Variations Data:", data.variations);

   for (let i = 0; i < data.variations.length; i++) {
     const variation = data.variations[i];
     formData.append(`variations[${i}][color]`, variation?.color);
     formData.append(`variations[${i}][quantity]`, variation?.quantity);
     formData.append(`variations[${i}][size]`, variation?.size);
   }
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("brand", data?.brand);
    formData.append("productType", data?.productType);
    formData.append("modal", data?.modal);
    formData.append("store", data?.store);
    formData.append('availability', data?.availability);
    // for (let i = 0; i < data?.images.length; i++) {
    //   formData.append("images", data?.images[i]);
    // }
    
    // Append images
    for (let i = 0; i < data?.images.length; i++) {
      formData.append(`images`, data?.images[i]?.file);
    }
    
    
    
    formData.append("price", data?.price);
    formData.append("type", data?.type);
    const response = await axios.post(
      `${POST_URL}/api/product/createProduct`,
      formData,
      {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response;
  }
});

// read Product
export const showProduct = createAsyncThunk("showProduct", async (data) => {
  try {
    // const { pageNumber, limit } = data;  // Destructure data object to get pageNumber and limit
    // const response = await axios.get(
    //   `${POST_URL}/api/product/getAllProducts?pageNumber=${pageNumber}&limit=${limit}`
    // );
    const authToken = getAuthToken().replace(/"/g, ''); 
    
    const response = await axios.get(
      `${POST_URL}/api/product/getAllProducts?pageNumber=1&limit=200`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
// delete Product
export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (id) => {
    const authToken = getAuthToken().replace(/"/g, ''); 
    try {
      const response = await axios.get(
        `${POST_URL}/api/product/findProductById/${id}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// update Product
export const updateProduct = createAsyncThunk("updateProduct", async (data) => {
  try {
   
    const authToken = getAuthToken().replace(/"/g, ''); 
    const formData = new FormData();
    formData.append("ProductId", data?._id);
    for (let i = 0; i < data?.variations.length; i++) {
      const variation = data?.variations[i];
      formData.append(`variations[${i}][color]`, variation?.color);
      formData.append(`variations[${i}][quantity]`, variation?.quantity);
      formData.append(`variations[${i}][size]`, variation?.size);
    }
    formData.append("name", data?.name);
    formData.append("modal", data?.modal);
    formData.append("description", data?.description);
    formData.append("productRate", data?.productRate);
    formData.append("brand", data?.brand?._id);
    formData.append("store", data?.store);
    formData.append('availability', data?.availability);
    formData.append("price", data?.price);
    formData.append('type', data?.type?._id);
    const response = await axios.post(
      `${POST_URL}/api/product/updateProduct`,
      formData,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

// delete Product
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.delete(
      `${POST_URL}/api/product/deleteProduct/${id}`,
      {
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
// update the  whisList product
export const updatewhishList = createAsyncThunk(
  "whishListProduct",
  async (id) => {
    const authToken = getAuthToken().replace(/"/g, ''); 
    try {
      const response = await axios.put(
        `${POST_URL}/api/product/updateToFeature/${id}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
