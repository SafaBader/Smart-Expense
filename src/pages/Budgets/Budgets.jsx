import "./Budgets.css";
import HeaderBudget from "../../components/Budgets/HeaderBudget/HeaderBudget";
import SummaryBudgets from "../../components/Budgets/SummaryBudgets/SummaryBudgets";
import BudgetAlerts from "../../components/Budgets/BudgetAlerts/BudgetAlerts";

function Budgets() {
  return (
    <section className="budgets_container">
        <HeaderBudget />
        <SummaryBudgets />
        <BudgetAlerts />
    </section>
  );
}

export default Budgets;
