// authService.js
import axios from 'axios';


export const signIn = async (userData) => {
  try {
    const response = await axios.post(`https://e-commerce-qubi.vercel.app/api/auth/user/loginAdmin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signUp = async (userData) => {
  
  try {
    const response = await axios.post(`https://e-commerce-qubi.vercel.app/api/auth/user/registerAdmin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
