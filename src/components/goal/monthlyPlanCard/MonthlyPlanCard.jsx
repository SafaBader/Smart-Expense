import Card from "../card/Card";
import "./MonthlyPlanCard.css";
import { useMemo, useState } from "react";

export default function MonthlyPlanCard({ goal, onApplyMonthlyUpdate }) {
  const current = safeNumber(goal?.current);
  const target = safeNumber(goal?.target);
  const remaining = Math.max(0, target - current);
  const targetDate = parseYYYYMMDD(goal?.targetDate);

  const monthsLeft =
    typeof goal?.monthsLeft === "number"
      ? goal.monthsLeft
      : calcMonthsLeft(targetDate);

  const monthlySave =
    typeof goal?.monthlySave === "number"
      ? goal.monthlySave
      : calcMonthlySave(remaining, monthsLeft);

  const monthKey = useMemo(() => getMonthKey(new Date()), []);
  const savedThisMonth = safeNumber(goal?.monthlySavedByMonth?.[monthKey]);

  const [deposit, setDeposit] = useState(0);
  const previewTotal = savedThisMonth + safeNumber(deposit);
  const previewStatus = computeStatus(previewTotal, monthlySave);

  const dots = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const arr = [];

    for (let i = 0; i < 12; i++) {
      const key = `${year}-${String(i + 1).padStart(2, "0")}`;
      const stored = goal?.monthlyStatusByMonth?.[key] || "missing";

      const status =
        key === monthKey
          ? deposit > 0
            ? previewStatus
            : stored
          : stored;

      arr.push({ key, monthIndex: i, status });
    }

    return arr;
  }, [goal?.monthlyStatusByMonth, monthKey, deposit, previewStatus]);

  const apply = async () => {
    if (typeof onApplyMonthlyUpdate !== "function") return;

    const amt = Number(deposit);
    if (!Number.isFinite(amt) || amt <= 0) return alert("Enter amount > 0.");

    await onApplyMonthlyUpdate(amt);
    setDeposit(0);
  };

  return (
    <Card tone="success" className="mpCard">
      <section className="mpHeaderRow">
        <section className="mpTitle">📈 Monthly Plan</section>
      </section>

      <section className="mpBlock">
        <section className="mpLabel">Save Each Month</section>
        <section className="mpBig">
          {Number.isFinite(monthlySave) ? money(monthlySave) : "—"}
        </section>
      </section>

      <section className="mpLine" />

      <section className="mpUpdateBox">
        <section className="mpUpdateTop">
          <section className="mpUpdateTitle">Add deposit</section>

          <section className={`mpPill ${pillClass(previewStatus)}`}>
            {prettyStatus(previewStatus)}
          </section>
        </section>

        <section className="mpInputRow">
          <span className="mpInputPrefix">{money(0).slice(0, 1) || "$"}</span>

          <input
            className="mpNumberInput"
            type="number"
            value={Number.isFinite(Number(deposit)) ? deposit : 0}
            onChange={(e) => setDeposit(Number(e.target.value))}
            placeholder="0"
            min={0}
          />
        </section>

        <section className="mpSavedMeta">
          Saved: <strong>{money(savedThisMonth)}</strong>
          <span className="mpSavedMetaSep">•</span>
          Total: <strong>{money(previewTotal)}</strong>
        </section>

        <button className="mpApplyBtn" onClick={apply}>
          Apply
        </button>

        <section className="mpHint">
          Remaining: <strong>{money(remaining)}</strong> • Months left:{" "}
          <strong>{Number.isFinite(monthsLeft) ? monthsLeft : "—"}</strong>
        </section>
      </section>

      <section className="mpYearDots">
        {dots.map((d) => (
          <section
            key={d.key}
            className={`mpDot ${dotClass(d.status)} ${
              d.key === monthKey ? "isCurrent" : ""
            }`}
            title={`${monthName(d.monthIndex)}: ${prettyStatus(d.status)}`}
          />
        ))}
      </section>

      <section className="mpDotsLegend">
        <span className="lgItem">
          <span className="lgDot achieved" /> Achieved
        </span>
        <span className="lgItem">
          <span className="lgDot partial" /> Partial
        </span>
        <span className="lgItem">
          <span className="lgDot missing" /> Missing
        </span>
      </section>
    </Card>
  );
}


function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function parseYYYYMMDD(value) {
  if (!value || typeof value !== "string") return null;
  const d = new Date(value + "T00:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

function calcMonthsLeft(targetDate) {
  if (!targetDate) return null;
  const now = new Date();
  const ms = targetDate.getTime() - now.getTime();
  const days = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  return Math.max(0, Math.ceil(days / 30));
}

function calcMonthlySave(remaining, monthsLeft) {
  if (!Number.isFinite(monthsLeft) || monthsLeft <= 0) return remaining;
  return Math.ceil(remaining / monthsLeft);
}

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));
}

function getMonthKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function prettyStatus(s) {
  if (s === "achieved") return "Achieved ✅";
  if (s === "partial") return "Partial 🟡";
  return "Missing ⚪";
}

function pillClass(s) {
  if (s === "achieved") return "achieved";
  if (s === "partial") return "partial";
  return "missing";
}

function dotClass(s) {
  if (s === "achieved") return "achieved";
  if (s === "partial") return "partial";
  return "missing";
}

function monthName(i) {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i];
}

function computeStatus(savedTotalThisMonth, expectedMonthly) {
  const saved = safeNumber(savedTotalThisMonth);
  const expected = safeNumber(expectedMonthly);

  if (!expected || expected <= 0) return saved > 0 ? "partial" : "missing";
  if (saved >= expected) return "achieved";
  if (saved > 0) return "partial";
  return "missing";
}