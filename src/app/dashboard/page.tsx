'use client'
import Navbar from "@/components/navbar";
import { Typography } from "@mui/material";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { fetchExpenseSummary } from '@/app/redux/thunk/expenseSummaryThunk';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import MonthlyTrends from "@/components/expenses/monthlyExpense";
import { fetchRecentExpenses } from "../redux/thunk/monthlyExpense.thunk";

type CategorySummary = {
    _id: string;
    totalAmount: number;
    count: number;
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bfff'];

export default function DashBoard() {
    const dispatch = useAppDispatch();

    // Summary state
    const { totalExpense, totalCount, categorySummary, loading: summaryLoading, error: summaryError } = useAppSelector(
        state => state.expenseSummary
    );

    // Recent transactions state
    const { recent, count: recentCount, loading: recentLoading, error: recentError } = useAppSelector(
        state => state.recentExpense
    );

    useEffect(() => {
        dispatch(fetchExpenseSummary());
        dispatch(fetchRecentExpenses());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="p-6 space-y-6">

                
                <div className="bg-indigo-50 p-6 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-indigo-700">Total Spending</h2>
                        <p className="text-xl mt-2">₹{totalExpense.toLocaleString()}</p>
                        <p className="text-gray-600">{totalCount} transactions</p>
                    </div>
                </div>

             
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
                    {categorySummary.length === 0 ? (
                        <p>No expenses available.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categorySummary} 
                                    dataKey="totalAmount"
                                    nameKey="_id"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label={(entry) => {
                                        const payload = entry.payload as CategorySummary;
                                        return `${payload._id}: ₹${payload.totalAmount.toLocaleString()}`;
                                    }}
                                >
                                    {categorySummary.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Recent Transactions ({recentCount})</h3>

                    {recentLoading ? (
                        <p>Loading transactions...</p>
                    ) : recentError ? (
                        <p className="text-red-500">{recentError}</p>
                    ) : recent.length === 0 ? (
                        <p>No recent transactions.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent.map(tx => (
                                        <tr key={tx._id} className="border-t border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-2">{tx.description || tx.title}</td>
                                            <td className="px-4 py-2">{tx.category}</td>
                                            <td className="px-4 py-2 text-green-600">₹{tx.amount.toLocaleString()}</td>
                                            <td className="px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
            <MonthlyTrends/>
        </>
    );
}
