import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "../../components/pages/Dashboard.css";
Modal.setAppElement("#root");

const EditExpenseModal = ({
  isOpen,
  onRequestClose,
  expense,
  categories,
  onSave,
}) => {
  const [values, setValues] = useState({
    label: "",
    amount: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    if (!expense) return;
    setValues({
      label: expense.label,
      amount: expense.amount,
      date: expense.date.slice(0, 10),
      category: expense.category["@id"] ?? expense.category,
    });
  }, [expense]);

  const handle = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (+values.amount <= 0) return toast.error("Montant invalide");
    if (values.date > new Date().toISOString().slice(0, 10))
      return toast.error("Date future impossible");

    await onSave(values);
    toast.success("Dépense mise à jour !");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
      contentLabel="Modifier dépense"
    >
      <h2>Modifier la dépense</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>
          Libellé
          <input name="label" value={values.label} onChange={handle} required />
        </label>
        <label>
          Montant
          <input
            name="amount"
            type="number"
            step="0.01"
            value={values.amount}
            onChange={handle}
            required
          />
        </label>
        <label>
          Date
          <input
            name="date"
            type="date"
            value={values.date}
            onChange={handle}
            required
          />
        </label>
        <label>
          Catégorie
          <select
            name="category"
            value={values.category}
            onChange={handle}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={`/api/categories/${c.id}`}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="modal-actions">
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={onRequestClose}>
            Annuler
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditExpenseModal;
