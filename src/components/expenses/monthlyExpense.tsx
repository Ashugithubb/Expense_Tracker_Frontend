import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fetchMonthlyTrends } from "@/app/redux/thunk/monthlyExpense.thunk";


const MonthlyTrends: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trends, loading, error } = useAppSelector(state => state.monthlyExpense);

  useEffect(() => {
    dispatch(fetchMonthlyTrends());
  }, [dispatch]);

  if (loading) return <p>Loading trends...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Monthly Spending Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrends;
