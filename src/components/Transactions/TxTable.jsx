function TxTable({ items, loading, onDelete }) {
  if (loading) return <div className="tx-empty">Loading...</div>;

  return (
    <div className="tx-tablewrap">
      <div className="tx-tablehead">
        <h3>Transaction History ({items.length})</h3>
      </div>

      <div className="tx-table">
        <div className="tx-row tx-row-head">
          <div>DATE</div>
          <div>TYPE</div>
          <div>CATEGORY</div>
          <div>NOTE</div>
          <div className="tx-right">AMOUNT</div>
          <div className="tx-right">DELETE</div>
        </div>

        {items.map((t) => (
          <div key={t.id} className="tx-row">
            <div>{prettyDate(t.date)}</div>

            <div>
              <span
                className={`tx-pill ${t.type === "income" ? "income" : "expense"}`}
              >
                {t.type}
              </span>
            </div>

            <div className="tx-strong">{t.category}</div>
            <div className="tx-muted">{t.note}</div>

            <div
              className={`tx-right tx-amount ${t.type === "income" ? "inc" : "exp"}`}
            >
              {t.type === "income" ? "+" : "-"}
              {money(t.amount)}
            </div>

            <div className="tx-right">
              <button className="tx-del" onClick={() => onDelete(t.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="tx-empty">No transactions found.</div>
        )}
      </div>
    </div>
  );
}

function money(n) {
  const num = Number(n || 0);
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function prettyDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
export default TxTable;
