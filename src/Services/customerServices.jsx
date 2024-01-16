import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const url link
const POST_URL = "https://e-commerce-qubi.vercel.app";
// Function to get the authorization token from local storage
const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem('token');
};
// create Customer
export const createCustomer = createAsyncThunk("createCustomer", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(`${POST_URL}/api/Customer/createCustomer`,data,
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

// read Customer
export const showCustomer = createAsyncThunk("showCustomer", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    // const { pageNumber, limit } = data;  // Destructure data object to get pageNumber and limit
    // const response = await axios.get(
    //   `${POST_URL}/api/Customer/getAllCustomers?pageNumber=${pageNumber}&limit=${limit}`
    // );
    const response = await axios.get(`${POST_URL}/api/auth/user/getAllCustomers?pageNumber=1&limit=10`,
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
// delete Customer
export const getSingleCustomer = createAsyncThunk("getSingleCustomer", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.get(
      `${POST_URL}/api/auth/user/getSingleUser/${id}`,
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

// update Customer
export const updateCustomer = createAsyncThunk("updateCustomer", async (data) => {
  const CustomerData={
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
  }
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.put(
      `${POST_URL}/api/auth/user/updateCustomer/${data._id}`,
      CustomerData,
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

// delete Customer
export const deleteCustomer = createAsyncThunk("deleteCustomer", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.delete(
      `${POST_URL}/api/auth/user/deleteSingleUser/${id}`,
      //for permanentaly delete use this url
      // `${POST_URL}/api/auth/user/deleteSingleUser/${id}?permanent =true`,
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