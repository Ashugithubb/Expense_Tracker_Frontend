import { createSlice } from '@reduxjs/toolkit';
import { fetchExpenses } from '../thunk/expenseThunk';

interface Expense {
  _id: string;
  title?: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface ExpenseState {
  expenses: Expense[];
  page: number;
  limit: number;
  totalPages: number;
  totalExpenses: number;
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  page: 1,
  limit: 5,
  totalPages: 0,
  totalExpenses: 0,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.totalExpenses = action.payload.totalExpenses;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        console.log("action", action.payload);
        state.error = action.payload as string;
      });
  },
});

export default expenseSlice.reducer;
