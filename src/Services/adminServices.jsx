import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const url link
const POST_URL = "https://e-commerce-qubi.vercel.app";
// Function to get the authorization token from local storage
const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem("token");
};
// create Admin
export const createAdmin = createAsyncThunk("createAdmin", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, "");
    const response = await axios.post(
      `${POST_URL}/api/Admin/createAdmin`,
      data,
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

// read Admin
export const showAdmin = createAsyncThunk("showAdmin", async (data) => {
  try {
    const authToken = getAuthToken().replace(/"/g, "");
    // const { pageNumber, limit } = data;  // Destructure data object to get pageNumber and limit
    // const response = await axios.get(
    //   `${POST_URL}/api/Admin/getAllAdmins?pageNumber=${pageNumber}&limit=${limit}`
    // );
    const response = await axios.get(`${POST_URL}/api/Admin/getAllAdmins`, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});
// delete Admin
export const getSingleAdmin = createAsyncThunk("getSingleAdmin", async (id) => {
  try {
    const authToken = getAuthToken().replace(/"/g, "");
    const response = await axios.get(
      `${POST_URL}/api/auth/user/getAdminById`,
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

export const updateProfileAdmin = createAsyncThunk(
  "updateProfileAdmin",
  async (data) => {
    const formData = new FormData();
    const addressValue = JSON.stringify({
      state: data?.state,
      zipCode: data?.zipCode,
      country: data?.country,
      city: data?.city
    });
    formData.append("userId",data?._id);
    formData.append("profilePic", data?.profilePic[0])
    formData.append("firstName", data?.firstName);
    formData.append("lastName", data?.lastName);
    formData.append("email", data?.email);
    formData.append("phoneNumber", data?.phoneNumber);
    formData.append("address", addressValue);
    formData.append("bio", data?.bio);
    try {
      const authToken = getAuthToken().replace(/"/g, "");
      const response = await axios.post(
        `${POST_URL}/api/auth/user/uploadAdminProfilePic`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Log detailed error information
      console.error("Error:", error.message); // Log the error message
      throw error; // Re-throw the error to propagate it further
    }
  }
);

