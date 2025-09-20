import { createSlice } from "@reduxjs/toolkit";
import { fetchExpenseSummary } from "../thunk/expenseSummaryThunk";

interface ExpenseSummaryState {
  totalExpense: number;
  totalCount: number;
  categorySummary: { _id: string; totalAmount: number; count: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseSummaryState = {
  totalExpense: 0,
  totalCount: 0,
  categorySummary: [],
  loading: false,
  error: null,
};

const expenseSummarySlice = createSlice({
  name: "expenseSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalExpense = action.payload.totalExpense;
        state.totalCount = action.payload.totalCount;
        state.categorySummary = action.payload.categorySummary;
      })
      .addCase(fetchExpenseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default expenseSummarySlice.reducer;
