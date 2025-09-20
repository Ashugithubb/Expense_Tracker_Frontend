import { loginSchema } from '@/app/(auth)/login/page';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';
type loginFormData = z.infer<typeof loginSchema>;
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: loginFormData, thunkAPI) => {
    try {
      const response = await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      console.log(data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);




export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true, 
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
