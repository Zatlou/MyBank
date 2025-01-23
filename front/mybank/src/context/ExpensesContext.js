import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../axios/api";

const ExpensesContext = createContext();

export const useExpenses = () => useContext(ExpensesContext);

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  // Récupérer les dépenses au chargement
  useEffect(() => {
    api
      .get("/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  // Ajouter une dépense via l'API
  const addExpense = (newExpense) => {
    api
      .post("/expenses", newExpense)
      .then((response) => {
        setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};
