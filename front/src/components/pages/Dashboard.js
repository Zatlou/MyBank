import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpenses } from "../../context/ExpensesContext";
import api from "../../axios/api";
import EditExpenseModal from "../modals/EditExpenseModal"; // <-- modal séparée
import "./Dashboard.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Dashboard = () => {
  /* ----------------- contexte ----------------- */
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  /* ----------------- ajout -------------------- */
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    label: "",
    amount: "",
    date: "",
    category: "",
  });

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
        toast.success("Dépense créée !");
        setForm({ label: "", amount: "", date: "", category: "" });
      })
      .catch(() => toast.error("Erreur création dépense"));
  };

  /* ----------------- édition (modal) ----------------- */
  const [editingExp, setEditingExp] = useState(null);
  const startEdit = (exp) => setEditingExp(exp);
  const saveEdit = (put) =>
    updateExpense(editingExp.id, put).catch(() =>
      toast.error("Échec de la mise à jour")
    );

  /* ----------------- suppression ----------------- */
  const askDelete = (exp) => {
    confirmAlert({
      title: "Confirmer la suppression",
      message: `Supprimer « ${exp.label} » ?`,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deleteExpense(exp.id)
              .then(() => toast.success("Supprimé !"))
              .catch(() => toast.error("Erreur")),
        },
        { label: "Non" },
      ],
    });
  };

  /* -------------------- render -------------------- */
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Mes dépenses</h1>

      {/* ----------- formulaire d’ajout ----------- */}
      <form className="expense-form" onSubmit={handleAddSubmit}>
        <input
          name="label"
          value={form.label}
          onChange={handleAddChange}
          placeholder="Libellé"
          required
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          value={form.amount}
          onChange={handleAddChange}
          placeholder="Montant"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleAddChange}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleAddChange}
          required
        >
          <option value="">Catégorie</option>
          {categories.map((c) => (
            <option key={c.id} value={`/api/categories/${c.id}`}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Ajouter</button>
      </form>

      {/* ---------------- tableau ---------------- */}
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.label}</td>
              <td>{exp.amount} €</td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>{exp.category.name}</td>
              <td>
                <button onClick={() => startEdit(exp)}>✏️</button>
                <button onClick={() => askDelete(exp)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -------- modal d’édition -------- */}
      <EditExpenseModal
        isOpen={!!editingExp}
        onRequestClose={() => setEditingExp(null)}
        expense={editingExp}
        categories={categories}
        onSave={saveEdit}
      />

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Dashboard;
