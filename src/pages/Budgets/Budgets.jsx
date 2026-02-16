import "./Budgets.css";
import HeaderBudget from "../../components/Budgets/HeaderBudget/HeaderBudget";
import SummaryBudgets from "../../components/Budgets/SummaryBudgets/SummaryBudgets";
function Budgets() {
  return (
    <section className="budgets_container">
        <HeaderBudget />
        <SummaryBudgets />
    </section>
  );
}

export default Budgets;
