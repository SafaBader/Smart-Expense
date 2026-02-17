import { useState } from "react";
import "./AllBudgets.css";
import BudgetCard from "./BudgetCard";

function AllBudgets() {
  const [budgets, setBudgets] = useState([
    { id: 1, name: "Food", spent: 425, limit: 500 },
    { id: 2, name: "Transport", spent: 145, limit: 200 },
    { id: 3, name: "Shopping", spent: 320, limit: 300 },
  ]);

  function handleDelete(id) {
    setBudgets(budgets.filter((b) => b.id !== id));
  }

  function handleUpdate(id, newLimit) {
    setBudgets(
      budgets.map((b) =>
        b.id === id ? { ...b, limit: Number(newLimit) } : b
      )
    );
  }

  return (
    <section className="allBudgets_container">
      <h2 className="allBudgets_title">All Budgets</h2>

      <section className="allBudgets_grid">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            {...budget}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </section>
    </section>
  );
}

export default AllBudgets;
