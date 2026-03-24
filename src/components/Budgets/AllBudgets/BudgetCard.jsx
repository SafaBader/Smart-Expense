import { useMemo, useState } from "react";
import "./BudgetCard.css";

function money(n) {
  const num = Number(n) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

function BudgetCard({ id, name, spent, limit, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(limit);
  //`useMemo` for `spentNum` and `limitNum` is not really buying much here because the computations are tiny. It is not wrong, just unnecessary complexity for simple numeric coercion.
  const spentNum = useMemo(() => Number(spent) || 0, [spent]);
  const limitNum = useMemo(() => Number(limit) || 0, [limit]);

  const percent = limitNum <= 0 ? 0 : (spentNum / limitNum) * 100;
  const pct = Math.max(0, Math.min(100, percent));
  const remaining = limitNum - spentNum;

  const stateClass =
    limitNum <= 0
      ? ""
      : percent >= 100
        ? "budgetCard_exceeded"
        : percent >= 80
          ? "budgetCard_warning"
          : percent >= 60
            ? "budgetCard_approaching"
            : "";

  return (
    <article className={`budgetCard_container ${stateClass}`}>
      <header className="budgetCard_header">
        <h3 className="budgetCard_name" title={name}>
          {name}
        </h3>

        <section className="budgetCard_actions">
          <button type="button" onClick={() => setIsEditing((v) => !v)}>
            {isEditing ? "Close" : "Edit"}
          </button>

          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </section>
      </header>

      {isEditing ? (
        <section className="budgetCard_editSection">
          <input
            type="number"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            min={0}
          />
          <button
            type="button"
            // Saving immediately closes edit mode without validating that `newLimit` is a positive number. The parent converts it, but the child should not allow obviously invalid values to be submitted.
            onClick={() => {
              onUpdate(id, newLimit);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </section>
      ) : (
        <>
          <progress className="budgetCard_progress" value={pct} max="100" />
          <p className="budgetCard_percent">{percent.toFixed(1)}%</p>

          <section className="budgetCard_numbers">
            <span>Spent: {money(spentNum)}</span>
            <span>Limit: {money(limitNum)}</span>
          </section>

          <p
            className={`budgetCard_remaining ${remaining < 0 ? "neg" : "pos"}`}
          >
            Remaining: {money(remaining)}
          </p>
        </>
      )}
    </article>
  );
}

export default BudgetCard;
