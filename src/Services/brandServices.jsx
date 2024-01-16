import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const url link
const POST_URL = "https://e-commerce-qubi.vercel.app";
// Function to get the authorization token from local storage
const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem('token');
};
// create Brand
export const createBrand = createAsyncThunk("createBrand", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(`${POST_URL}/api/brand/createBrand`,data,
    {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// read Brand
export const showBrand = createAsyncThunk("showBrand", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    // const { pageNumber, limit } = data;  // Destructure data object to get pageNumber and limit
    // const response = await axios.get(
    //   `${POST_URL}/api/Brand/getAllBrands?pageNumber=${pageNumber}&limit=${limit}`
    // );
    const response = await axios.get(`${POST_URL}/api/brand/getAllBrands`,
    {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});
// delete Brand
export const getSingleBrand = createAsyncThunk("getSingleBrand", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.get(
      `${POST_URL}/api/brand/findBrandById/${id}`,
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

// update Brand
export const updateBrand = createAsyncThunk("updateBrand", async (data) => {
  const brandData={
    BrandId:data._id,
    brandName:data.brandName
  }
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(
      `${POST_URL}/api/Brand/updateBrand`,
      brandData,
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

// delete Brand
export const deleteBrand = createAsyncThunk("deleteBrand", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.delete(
      `${POST_URL}/api/brand/deleteBrand/${id}`,
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