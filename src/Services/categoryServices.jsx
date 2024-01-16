import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const url link
const POST_URL = "https://e-commerce-qubi.vercel.app";
// Function to get the authorization token from local storage
const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem('token');
};
// create Category
export const createCategory = createAsyncThunk("createCategory", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(`${POST_URL}/api/Category/createCategory`,data,
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

// read Category
export const showCategory = createAsyncThunk("showCategory", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    // const { pageNumber, limit } = data;  // Destructure data object to get pageNumber and limit
    // const response = await axios.get(
    //   `${POST_URL}/api/Category/getAllCategorys?pageNumber=${pageNumber}&limit=${limit}`
    // );
    const response = await axios.get(`${POST_URL}/api/category/getAllCategories`,
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
// delete Category
export const getSingleCategory = createAsyncThunk("getSingleCategory", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.get(
      `${POST_URL}/api/category/findCategoryById/${id}`,
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

// update Category
export const updateCategory = createAsyncThunk("updateCategory", async (data) => {
  const categoryData={
    CategoryId:data._id,
    categoryName:data.categoryName
  }
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(
      `${POST_URL}/api/category/updateCategory`,
      categoryData,
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

// delete Category
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.delete(
      `${POST_URL}/api/category/deleteCategory/${id}`,
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