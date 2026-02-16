import "./HeaderBudget.css";

function HeaderBudget() {
  return (
    <header className="headerBudget_container">
      
      <hgroup className="headerBudget_text">
        <h1 className="headerBudget_title">Budgets</h1>
        <p className="headerBudget_subtitle">
          Manage your monthly spending limits
        </p>
      </hgroup>

      <button className="headerBudget_button">
        Set Budget
      </button>

    </header>
  );
}

export default HeaderBudget;
