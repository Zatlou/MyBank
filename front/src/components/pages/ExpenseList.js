import React from "react";
import { useExpenses } from "../../context/ExpensesContext";

const ExpenseList = () => {
  const { expenses } = useExpenses();

  return (
    <div>
      <h2>Mes dépenses</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.label} — {exp.amount} € —{" "}
            {new Date(exp.date).toLocaleDateString()} — {exp.category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
