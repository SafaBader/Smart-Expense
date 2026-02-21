import { useState } from "react";
import "./BudgetCard.css";

function BudgetCard({ id, name, spent, limit, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(limit);

  const percent = limit === 0 ? 0 : (spent / limit) * 100;
  const remaining = limit - spent;

  return (
    <article className="budgetCard_container">
      
      <header className="budgetCard_header">
        <h3 className="budgetCard_name">{name}</h3>

        <section className="budgetCard_actions">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(id)}
          >
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
          />
          <button
            type="button"
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
          <progress value={percent} max="100" />
          <p>{percent.toFixed(1)}%</p>

          <p>Spent: ${spent}</p>
          <p>Limit: ${limit}</p>

          <p className={remaining < 0 ? "neg" : "pos"}>
            Remaining: ${remaining}
          </p>
        </>
      )}
    </article>
  );
}

export default BudgetCard;
