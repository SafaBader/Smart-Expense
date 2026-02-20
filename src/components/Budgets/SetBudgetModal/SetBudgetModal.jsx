import { useEffect, useMemo, useState } from "react";
import "./SetBudgetModal.css";

const ALL_CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

function SetBudgetModal({ isOpen, onClose, existingBudgets, onCreate }) {
  const usedNames = useMemo(() => {
    return new Set(
      (existingBudgets || []).map((b) => String(b.name || "").toLowerCase())
    );
  }, [existingBudgets]);

  const availableCategories = useMemo(() => {
    return ALL_CATEGORIES.filter((c) => !usedNames.has(c.toLowerCase()));
  }, [usedNames]);

  const [category, setCategory] = useState("Other");
  const [monthlyLimit, setMonthlyLimit] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setCategory(availableCategories[0] || "Other");
    setMonthlyLimit("");
  }, [isOpen, availableCategories]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!category) return;

    const limitNum = Number(monthlyLimit);
    if (!Number.isFinite(limitNum) || limitNum <= 0) return;

    onCreate({ name: category, monthlyLimit: limitNum });
    onClose();
  }

  return (
    <section className="setBudgetModal_overlay" aria-label="Create budget modal">
      <form className="setBudgetModal_card" onSubmit={handleSubmit}>
        <header className="setBudgetModal_header">
          <section className="setBudgetModal_titles">
            <h2 className="setBudgetModal_title">Create Budget</h2>
            <p className="setBudgetModal_subtitle">
              Set a monthly spending limit for a category
            </p>
          </section>

          <button
            type="button"
            className="setBudgetModal_close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <label className="setBudgetModal_label">
          Category
          <select
            className="setBudgetModal_select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={availableCategories.length === 0}
          >
            {availableCategories.length === 0 ? (
              <option value="">{`All categories already have budgets`}</option>
            ) : (
              availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="setBudgetModal_label">
          Monthly Limit
          <input
            className="setBudgetModal_input"
            type="number"
            placeholder="500"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            min="1"
          />
        </label>

        <footer className="setBudgetModal_footer">
          <button
            type="submit"
            className="setBudgetModal_primary"
            disabled={availableCategories.length === 0}
          >
            Create Budget
          </button>

          <button
            type="button"
            className="setBudgetModal_secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </footer>
      </form>
    </section>
  );
}

export default SetBudgetModal;
