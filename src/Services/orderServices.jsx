import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const url link
const POST_URL = "https://e-commerce-qubi.vercel.app";
// Function to get the authorization token from local storage
const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem('token');
};
// create Order
export const createOrder = createAsyncThunk("createOrder", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(`${POST_URL}/api/Order/createOrder`,data,
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

// read Order
export const showOrder = createAsyncThunk("showOrder", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    // const { pageNumber, limit } = data;  // Destructure data object to get pageNumber and limit
    // const response = await axios.get(
    //   `${POST_URL}/api/Order/getAllOrders?pageNumber=${pageNumber}&limit=${limit}`
    // );
    const response = await axios.get(`${POST_URL}/api/Order/getAllOrderAdmin?pageNumber=1&limit=200`,
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
// delete Order
export const getSingleOrder = createAsyncThunk("getSingleOrder", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.get(
      `${POST_URL}/api/Order/findOrderById/${id}`,
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

// update Order
export const updateOrder = createAsyncThunk("updateOrder", async (data) => {
  const OrderData={
    OrderId:data._id,
    OrderName:data.OrderName
  }
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.post(
      `${POST_URL}/api/Order/updateOrder`,
      OrderData,
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

export const deleteOrder = createAsyncThunk("deleteOrder", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, ''); 
    const response = await axios.delete(
      `${POST_URL}/api/order/deleteOrder/${data._id}`,
      {
        data: {
          deletionReason: data.deletionReason
        },
        headers: {
          Authorization: `${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

