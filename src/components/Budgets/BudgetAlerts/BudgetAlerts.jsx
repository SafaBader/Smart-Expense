import { useState } from "react";
import "./BudgetAlerts.css";

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function BudgetAlerts() {
  const [alerts, setAlerts] = useState([
    { id: "a1", type: "exceeded", name: "Shopping", spent: 320, limit: 300 },
    { id: "a2", type: "warning", name: "Food", spent: 425, limit: 500 },
    { id: "a3", type: "approaching", name: "Transport", spent: 145, limit: 200 },
  ]);

  function handleDelete(id) {
    setAlerts(alerts.filter((a) => a.id !== id));
  }

  return (
    <section className="budgetAlerts_container" aria-label="Budget alerts">
      <header className="budgetAlerts_header">
        <h2 className="budgetAlerts_title">Budget Alerts</h2>
        <p className="budgetAlerts_subtitle">
          {alerts.length} budgets need your attention
        </p>
      </header>

      <ul className="budgetAlerts_list">
        {alerts.map((a) => {
          const percent = a.limit === 0 ? 0 : (a.spent / a.limit) * 100;

          return (
            <li
              key={a.id}
              className={`budgetAlerts_item budgetAlerts_${a.type}`}
            >
              <header className="budgetAlerts_itemHeader">
                <p className="budgetAlerts_itemTitle">
                  {a.type === "exceeded"
                    ? "Exceeded"
                    : a.type === "warning"
                    ? "Warning"
                    : "Approaching Limit"}{" "}
                  {a.name}
                </p>

                <button
                  className="budgetAlerts_closeBtn"
                  onClick={() => handleDelete(a.id)}
                  aria-label="Remove alert"
                >
                  ×
                </button>
              </header>

              <p className="budgetAlerts_itemText">
                You've spent {money(a.spent)} of your {money(a.limit)} budget (
                {percent.toFixed(1)}%).
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BudgetAlerts;
