'use client'
import Navbar from '@/components/navbar';
import AddExpense from '@/components/expenses/addExpense';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { deleteExpense, fetchExpenses } from '@/app/redux/thunk/expenseThunk';
import { Box, Pagination } from '@mui/material';
import { Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type ExpenseType = {
  _id: string;
  description: string;
  category: string;
  amount: number;
  date: string;

};
export default function ExpensePage() {
  const dispatch = useAppDispatch();
  const { expenses, loading, error, page, totalPages, limit } = useAppSelector(state => state.expenseList);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType | null>(null);
  const [expenseId, setId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchExpenses({
        page: 1,
        limit: limit || 5,
        search,
        category,
        startDate,
        endDate
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, search, category, startDate, endDate, limit]);

  const handleEdit = (id: string) => {
    const expense = expenses.find(exp => exp._id === id) || null;
    setSelectedExpense(expense);
    setId(id)
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const res = await dispatch(deleteExpense(id));
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success("Expense deleted successfully!");
        dispatch(fetchExpenses({ page, limit, search, category, startDate, endDate }));
      } else {
        toast.error(res.payload || "Unable to Delete");
      }
    }
  };


  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <input
            type="text"
            placeholder="Search description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={() => setIsOpen(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition font-semibold"
          >
            + Add New Expense
          </button>
        </div>


        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : expenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                  <th className="border px-4 py-2 text-left">Amount</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => (
                  <tr key={exp._id} className="hover:bg-gray-50 transition">
                    <td className="border px-4 py-2">{exp.description}</td>
                    <td className="border px-4 py-2">{exp.category}</td>
                    <td className="border px-4 py-2">₹{exp.amount}</td>
                    <td className="border px-4 py-2"> {new Date(exp.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</td>
                    <td className="border px-4 py-2 text-center">
                      <Stack direction="row" spacing={1} justifyContent="center">

                        <IconButton color="error" onClick={() => handleDelete(exp._id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(exp._id)}>
                          <EditIcon />
                        </IconButton>
                      </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>



        {totalPages >= 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={(_, value) => {
                dispatch(fetchExpenses({
                  page: value,
                  limit: limit || 5,
                  search,
                  category,
                  startDate,
                  endDate
                }));
              }}
            />
          </Box>
        )}


        {isOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedExpense(null);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
              >
                &times;
              </button>

              <AddExpense
                onClose={() => {
                  setIsOpen(false);
                  setSelectedExpense(null);
                }}
                expense={selectedExpense}
                id={expenseId}
              />
            </div>
          </div>
        )}

      </div>
    </>
  );
}
