
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchRecentExpenses } from "../thunk/monthlyExpense.thunk";


export interface Expense {
  _id: string;
  description?: string;
  title?: string;
  category: string;
  amount: number;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
export interface ExpenseState {
  recent: Expense[];
  count: number;
  loading: boolean;
  error: string | null;
}
export interface RecentExpensesResponse {
  recentTransactions: Expense[];
  count: number;
}
const initialState: ExpenseState = {
  recent: [],
  count: 0,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecentExpenses.fulfilled,
        (state, action: PayloadAction<RecentExpensesResponse>) => {
          state.loading = false;
          state.recent = action.payload.recentTransactions;
          state.count = action.payload.count;
        }
      )
      .addCase(
        fetchRecentExpenses.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default expenseSlice.reducer;
