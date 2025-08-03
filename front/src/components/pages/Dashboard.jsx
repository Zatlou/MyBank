import React, { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpenses } from "../../context/ExpensesContext";
import api from "../../axios/api";
import EditExpenseModal from "../modals/EditExpenseModal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CategoryChart from "../charts/CategoryChart";
const Dashboard = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    label: "",
    amount: "",
    date: "",
    category: "",
  });
  const [editingExp, setEditingExp] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then(({ data }) => setCategories(data["hydra:member"] || []))
      .catch(console.error);
  }, []);

  const handleAddChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addExpense(form)
      .then(() => {
        toast.success("Expense created!");
        setForm({ label: "", amount: "", date: "", category: "" });
      })
      .catch(() => toast.error("Error creating expense"));
  };

  const startEdit = (exp) => setEditingExp(exp);
  const saveEdit = (put) =>
    updateExpense(editingExp.id, put).catch(() => toast.error("Update failed"));

  const askDelete = (exp) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Delete “${exp.label}”?`,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            deleteExpense(exp.id)
              .then(() => toast.success("Deleted!"))
              .catch(() => toast.error("Error deleting")),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#14213D]/5 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#14213D]">My Expenses</h1>
        </header>

        {/* Form to add an expense */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <form
            onSubmit={handleAddSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <input
              name="label"
              value={form.label}
              onChange={handleAddChange}
              placeholder="Description"
              className="border border-[#000000] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#59E5A9]"
              required
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={handleAddChange}
              placeholder="Amount"
              className="border border-[#000000] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#59E5A9]"
              required
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleAddChange}
              className="border border-[#000000] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#59E5A9]"
              required
            />
            <select
              name="category"
              value={form.category}
              onChange={handleAddChange}
              className="border border-[#000000] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#59E5A9]"
              required
            >
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c.id} value={`/api/categories/${c.id}`}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="sm:col-span-2 lg:col-auto bg-[#59E5A9] hover:bg-[#14213D] text-[#000000] font-semibold rounded-lg p-2 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Table of expenses */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#59E5A9] text-white">
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="even:bg-white hover:bg-[#FCA311]/10 transition"
                >
                  <td className="px-4 py-2">{exp.label}</td>
                  <td className="px-4 py-2">{exp.amount} €</td>
                  <td className="px-4 py-2">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{exp.category.name}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => startEdit(exp)}
                      className="p-2 hover:bg-[#59E5A9]/10 rounded-md transition text-[#59E5A9]"
                      aria-label="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => askDelete(exp)}
                      className="p-2 hover:bg-[#EC0B43]/10 rounded-md transition text-[#EC0B43]"
                      aria-label="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CategoryChart expenses={expenses} />
        {/* Modal for editing */}
        <EditExpenseModal
          isOpen={!!editingExp}
          onRequestClose={() => setEditingExp(null)}
          expense={editingExp}
          categories={categories}
          onSave={saveEdit}
        />

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Dashboard;
