import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExpenseSummary = createAsyncThunk(
  "expense/fetchSummary",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
         `${process.env.NEXT_PUBLIC_API_URL}expense/summary`, 
        { withCredentials: true }
      );
      return response.data; 
    } catch (error: any) {
      const message = error.response?.data?.error || "Failed to fetch summary";
      return thunkAPI.rejectWithValue(message);
    }
  }
);