import "./AllBudgets.css";
import BudgetCard from "./BudgetCard";
import { deleteBudget, updateBudget } from "../../../services/budgetsService";

function AllBudgets({ budgets, setBudgets, userId }) {
  async function handleDelete(id) {
    //`handleDelete` has no error handling. If the Firestore delete fails, the user gets optimistic UI behavior only if the call succeeds; otherwise the UI can become inconsistent.
    await deleteBudget(userId, id);
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  }

  async function handleUpdate(id, newLimit) {
    const limitNum = Number(newLimit);
    // Same issue for updates: local state is changed after the Firestore call, but errors are not caught or surfaced.
    await updateBudget(userId, id, { monthlyLimit: limitNum });

    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, monthlyLimit: limitNum } : b)),
    );
  }

  return (
    <section className="allBudgets_container">
      <h2 className="allBudgets_title">All Budgets</h2>

      <section className="allBudgets_grid">
        {budgets.map((b) => (
          <BudgetCard
            key={b.id}
            id={b.id}
            name={b.name}
            spent={b.spent}
            limit={b.limit}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </section>
    </section>
  );
}

export default AllBudgets;
