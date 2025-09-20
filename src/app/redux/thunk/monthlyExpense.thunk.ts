import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MonthlyTrend } from "../slice/monthlyTrend.slice";
import axios from "axios";
import { RecentExpensesResponse } from "../slice/recent.expense.slice";
export const fetchMonthlyTrends = createAsyncThunk<
  MonthlyTrend[],
  void,
  { rejectValue: string }>(
    "monthlyTrends/fetch",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get<MonthlyTrend[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/expense/monthly-trends`
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


export const fetchRecentExpenses = createAsyncThunk<
  RecentExpensesResponse,
  void,
  { rejectValue: string }
>("expenses/fetchRecent", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecentExpensesResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/expense/recent`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
