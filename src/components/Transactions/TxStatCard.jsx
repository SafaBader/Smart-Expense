function TxStatCard({ label, value, tone, icon }) {
  return (
    <div className="tx-card">
      <div>
        <div className="tx-card-label">{label}</div>
        <div className={`tx-card-value ${tone}`}>{money(value)}</div>
      </div>
      <div className={`tx-icon ${tone}`}>{icon}</div>
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
export default TxStatCard;
