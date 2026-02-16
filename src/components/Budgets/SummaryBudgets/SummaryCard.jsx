import "./SummaryCard.css";

function SummaryCard({ title, amount, icon, iconClass }) {
  return (
    <article className="summaryCard_container">
      <header className="summaryCard_left">
        <p className="summaryCard_title">{title}</p>
        <p className="summaryCard_amount">{amount}</p>
      </header>

      <span className={`summaryCard_iconBox ${iconClass}`}>{icon}</span>
    </article>
  );
}

export default SummaryCard;
