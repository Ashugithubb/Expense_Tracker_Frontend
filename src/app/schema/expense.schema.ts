// schema/expense.schema.ts
import { z } from "zod";

export const expenseSchema = z.object({
  amount: z
    .number({ message: "Amount must be a number" }) 
    .positive({ message: "Amount must be greater than 0" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  date: z.string().min(1, { message: "Date is required" }),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
