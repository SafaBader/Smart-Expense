import "./SummaryBudgets.css";
import SummaryCard from "./SummaryCard";

function SummaryBudgets() {
  // dummy values for now (later from Firebase)
  const totalBudget = 1150;
  const totalSpent = 1010;
  const remaining = totalBudget - totalSpent;

  const money = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <section className="summaryBudgets_container" aria-label="Budgets summary">
      <SummaryCard
        title="Total Budget"
        amount={money(totalBudget)}
        icon="💳"
        iconClass="summaryCard_blue"
      />

      <SummaryCard
        title="Total Spent"
        amount={money(totalSpent)}
        icon="🧾"
        iconClass="summaryCard_purple"
      />

      <SummaryCard
        title="Remaining"
        amount={money(remaining)}
        icon="✅"
        iconClass="summaryCard_green"
      />
    </section>
  );
}

export default SummaryBudgets;
