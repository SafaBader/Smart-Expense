import "./BudgetAlerts.css";

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function BudgetAlerts() {
  // dummy alerts for now
  const alerts = [
    { id: "a1", type: "exceeded", name: "Shopping", spent: 320, limit: 300 },
    { id: "a2", type: "warning", name: "Food", spent: 425, limit: 500 },
    { id: "a3", type: "approaching", name: "Transport", spent: 145, limit: 200 },
  ];

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
            <li key={a.id} className={`budgetAlerts_item budgetAlerts_${a.type}`}>
              <p className="budgetAlerts_itemTitle">
                {a.type === "exceeded" ? "Exceeded" : a.type === "warning" ? "Warning" : "Approaching Limit"}{" "}
                {a.name}
              </p>

              <p className="budgetAlerts_itemText">
                You&apos;ve spent {money(a.spent)} of your {money(a.limit)} budget (
                {percent.toFixed(1)}%).
                {a.type === "exceeded"
                  ? " You have exceeded your budget limit."
                  : " You're close to reaching your budget limit."}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BudgetAlerts;
