import React, { useState, useEffect } from "react";
import api from "../../axios/api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    api
      .get("/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.label} - {expense.amount}€ - {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
