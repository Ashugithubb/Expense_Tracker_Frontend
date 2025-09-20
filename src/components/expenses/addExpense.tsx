'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { ExpenseFormData, expenseSchema } from "../../app/schema/expense.schema";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { addExpense } from "@/app/redux/thunk/addExpense";
import { editExpense, fetchExpenses } from "@/app/redux/thunk/expenseThunk";


type AddExpenseProps = {
    onClose?: () => void;
    expense?: ExpenseFormData | null;
    id?: string
};

export default function AddExpense({ onClose, expense, id }: AddExpenseProps) {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
        defaultValues: expense || { amount: 0, description: "", category: "", date: "" }
    });


    useEffect(() => {
        if (expense) {
            reset(expense);
        }
    }, [expense, reset]);

    const onSubmit = async (data: any) => {
        try {
            let res;
            if (expense && id) {
                res = await dispatch(editExpense({ ...data, id }));
            } else {

                res = await dispatch(addExpense(data));
            }

            if (res.meta.requestStatus === 'fulfilled') {
                toast.success(expense ? "Expense updated successfully!" : "Expense added successfully!");
                dispatch(fetchExpenses())
                if (onClose) {
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                }
            } else {
                toast.error(res.payload || "Something went wrong!");
            }
        } catch (err) {
            toast.error("An error occurred!");
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
                {expense ? "Edit Expense" : "Add New Expense"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    {...register("amount", { valueAsNumber: true })}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.amount ? "border-red-500" : ""}`}
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}

                <input
                    type="text"
                    placeholder="Description"
                    {...register("description")}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                <select
                    {...register("category")}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.category ? "border-red-500" : ""}`}
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Others">Others</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

                <input
                    type="date"
                    {...register("date")}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.date ? "border-red-500" : ""}`}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    {expense ? "Update Expense" : "Add Expense"}
                </button>
            </form>
        </div>
    );
}
