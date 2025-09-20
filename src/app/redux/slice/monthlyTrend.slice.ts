
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMonthlyTrends } from "../thunk/monthlyExpense.thunk";

export interface MonthlyTrend {
  _id: string;
  totalAmount: number;
  count: number;
}
export interface MonthlyTrendsState {
  trends: MonthlyTrend[];
  loading: boolean;
  error: string | null;
}
const initialState: MonthlyTrendsState = {
  trends: [],
  loading: false,
  error: null,
};
const monthlyTrendsSlice = createSlice({
  name: "monthlyTrends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMonthlyTrends.fulfilled,
        (state, action: PayloadAction<MonthlyTrend[]>) => {
          state.loading = false;
          state.trends = action.payload;
        }
      )
      .addCase(
        fetchMonthlyTrends.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default monthlyTrendsSlice.reducer;
