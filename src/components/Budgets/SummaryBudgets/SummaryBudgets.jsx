import "./SummaryBudgets.css";

function SummaryBudgets({ totals }) {
  const money = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      Number(n) || 0
    );

  return (
    <section className="summary_container">
        <article className="summary_card summary_total">
            <span className="summary_label">Total Budget</span>
            <span className="summary_value">{money(totals.totalBudget)}</span>
        </article>

        <article className="summary_card summary_spent">
            <span className="summary_label">Total Spent</span>
            <span className="summary_value">{money(totals.totalSpent)}</span>
        </article>

        <article className="summary_card summary_remaining">
            <span className="summary_label">Remaining</span>
            <span className="summary_value">{money(totals.remaining)}</span>
        </article>
        </section>

  );
}

export default SummaryBudgets;
