import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../axios/api";

const ExpensesContext = createContext();
export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!api.defaults.headers.common.Authorization) return;

    api
      .get("/expenses")
      .then(({ data }) => setExpenses(data["hydra:member"] || []))
      .catch(console.error);
  }, []);

  const addExpense = async (payload) => {
    const { data } = await api.post("/expenses", payload);
    setExpenses((prev) => [...prev, data]);
  };

  const updateExpense = async (id, payload) => {
    const { data } = await api.put(`/expenses/${id}`, payload);
    setExpenses((prev) => prev.map((e) => (e.id === id ? data : e)));
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
