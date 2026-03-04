import "./HeaderBudget.css";

function HeaderBudget({ onSetBudgetClick }) {
  return (
    <section className="headerBudget_container">
      <button
        className="headerBudget_button"
        type="button"
        onClick={onSetBudgetClick}
      >
        + Set Budget
      </button>
    </section>
  );
}

export default HeaderBudget;