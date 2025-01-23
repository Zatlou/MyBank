import React, { useState } from "react";
import { useExpenses } from "../../context/ExpensesContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { expenses, addExpense } = useExpenses();
  const [newExpense, setNewExpense] = useState({
    label: "",
    amount: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(newExpense); // Envoie la dépense au backend
    setNewExpense({ label: "", amount: "", date: "", category: "" });
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          name="label"
          value={newExpense.label}
          onChange={handleChange}
          placeholder="Label (e.g., Groceries)"
          required
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleChange}
          placeholder="Amount (e.g., 50)"
          required
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={newExpense.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.label}</td>
              <td>${expense.amount}</td>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
