import "./BudgetAlerts.css";

function BudgetAlerts({ alerts }) {
  const money = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      Number(n) || 0
    );

  return (
    <section className="budgetAlerts_container">
      <header className="budgetAlerts_header">
        <h2 className="budgetAlerts_title">Budget Alerts</h2>
        <p className="budgetAlerts_subtitle">
          {alerts.length} budgets need your attention
        </p>
      </header>

      <ul className="budgetAlerts_list">
        {alerts.map((a) => (
          <li
            key={a.id}
            className={`budgetAlerts_item budgetAlerts_${a.type}`}
          >
            <p className="budgetAlerts_itemTitle">
              {a.type === "exceeded"
                ? `Budget Exceeded: ${a.name}`
                : a.type === "warning"
                ? `Budget Warning: ${a.name}`
                : `Approaching Limit: ${a.name}`}
            </p>

            <p className="budgetAlerts_itemText">
              You've spent {money(a.spent)} of your {money(a.limit)} budget (
              {a.percent.toFixed(1)}%).
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BudgetAlerts;
