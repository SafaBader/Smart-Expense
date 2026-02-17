import "./Budgets.css";
import HeaderBudget from "../../components/Budgets/HeaderBudget/HeaderBudget";
import SummaryBudgets from "../../components/Budgets/SummaryBudgets/SummaryBudgets";
import BudgetAlerts from "../../components/Budgets/BudgetAlerts/BudgetAlerts";
import AllBudgets from "../../components/Budgets/AllBudgets/AllBudgets";


function Budgets() {
  return (
    <section className="budgets_container">
        <HeaderBudget />
        <SummaryBudgets />
        <BudgetAlerts />
        <AllBudgets />
    </section>
  );
}

export default Budgets;
