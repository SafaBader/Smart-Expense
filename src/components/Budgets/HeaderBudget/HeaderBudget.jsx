import "./HeaderBudget.css";

function HeaderBudget({ onSetBudgetClick }) {
  return (
    <header className="headerBudget_container">
      <section className="headerBudget_text">
        <h1 className="headerBudget_title">Budgets</h1>
        <p className="headerBudget_subtitle">Manage your monthly spending limits</p>
      </section>

      <button className="headerBudget_button" type="button" onClick={onSetBudgetClick}>
        + Set Budget
      </button>
    </header>
  );
}

export default HeaderBudget;
