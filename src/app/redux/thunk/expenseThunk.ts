import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

interface GetExpensesParams {
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface GetExpensesResponse {
  expenses: Expense[];
  page: number;
  limit: number;
  totalPages: number;
  totalExpenses: number;
}

export const fetchExpenses = createAsyncThunk<
  GetExpensesResponse,
  GetExpensesParams | undefined
>(
  'expenses/fetch',
  async (params, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();

      if (params?.search) queryParams.append('search', params.search);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await axios.get<GetExpensesResponse>(
        `http://localhost:3001/api/expense?${queryParams.toString()}`,
        { withCredentials: true },

      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch expenses';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editExpense = createAsyncThunk(
  'expense/editExpense',
  async (data: any, thunkAPI) => {
    console.log("expense.id",data.id)
    try {
      const response = await axios.put(
        `http://localhost:3001/api/expense/${data.id}`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update expense';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/expense/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to delete expense';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


