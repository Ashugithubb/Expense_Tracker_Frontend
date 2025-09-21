import { expenseSchema } from '@/app/schema/expense.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import z from 'zod';


type ExpenseFormData = z.infer<typeof expenseSchema>;

export const addExpense = createAsyncThunk(
  'expenses/add',
  async (data: ExpenseFormData, thunkAPI) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/expense`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to add expense';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
