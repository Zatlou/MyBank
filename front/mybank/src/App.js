import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ExpensesProvider } from "./context/ExpensesContext";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";

const App = () => {
  return (
    <ExpensesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ExpensesProvider>
  );
};

export default App;
