import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import "./HomeIndex.css";

export default function HomeIndex() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Another auth listener is created here even though the route is already protected by `ProtectedRoute`. This duplication increases complexity. Consider using a shared auth context or reading the current user from one central place.
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const goalRef = useMemo(() => {
    if (!user) return null;
    return doc(db, "users", user.uid, "goals", "main");
  }, [user]);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!goalRef) {
        setGoal(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const snap = await getDoc(goalRef);
        if (!alive) return;
        setGoal(snap.exists() ? snap.data() : null);
      } catch (e) {
        console.error("HomeIndex load goal failed:", e);
        // Logging the error is useful for development, but if loading the goal fails, the user gets no feedback. Add an error state in the UI. and cal it error insted of e
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [goalRef]);

  if (!user) return <section className="homeLoading">Loading user...</section>;
  //  `if (!user) return "Loading user..."` can create confusing UX if the user is actually signed out, because the page depends on route protection and internal auth resolution at the same time. Centralize auth responsibility.
  if (loading) return <section className="homeLoading">Loading...</section>;

  const hasGoal = !!goal?.name;

  const current = safeNumber(goal?.current);
  const target = safeNumber(goal?.target);
  const remaining = Math.max(0, target - current);

  const percent = target > 0 ? clamp((current / target) * 100, 0, 100) : 0;

  const monthKey = getMonthKey(new Date());
  const savedThisMonth = safeNumber(goal?.monthlySavedByMonth?.[monthKey]);
  const expectedMonthly = safeNumber(goal?.monthlySave);

  const { statusTone, statusTitle, statusSubtitle } = buildSmartMessage({
    hasGoal,
    percent,
    expectedMonthly,
    savedThisMonth,
    remaining,
  });

  return (
    <section className="home">
      <header className={`hero hero--${statusTone}`}>
        <section className="heroTop">
          <section>
            <h1 className="heroTitle">{statusTitle}</h1>
            <p className="heroSub">{statusSubtitle}</p>
          </section>

          <section className="heroMini">
            <span className="miniLabel">This month</span>
            <span className="miniValue">{money(savedThisMonth)}</span>
          </section>
        </section>

        <section className="heroProgress">
          <section className="bar">
            <section
              className="barFill"
              style={{ width: `${Math.round(percent)}%` }}
            />
          </section>

          <section className="barMeta">
            <span>{Math.round(percent)}%</span>
            <span>
              {money(current)} / {money(target || 0)}
            </span>
          </section>
        </section>
      </header>

      <section className="actions">
        <button
          className="actionBtn primary"
          onClick={() => navigate("/home/transactions")}
        >
          + Add Expense / Saving
        </button>

        {/* <button className="actionBtn primary" onClick={() => navigate("/home/budgets")}>
          + Add Expense / Saving
        </button> */}

        <button
          className="actionBtn success"
          onClick={() => navigate("/home/budgets")}
        >
          + View Budget
        </button>

        <button
          className="actionBtn ghost"
          onClick={() => navigate("/home/goal")}
        >
          🎯 View Goal
        </button>
      </section>

      <section className="grid">
        <article className="card">
          <h3 className="cardTitle">Today’s insight</h3>

          {!hasGoal ? (
            <p className="cardText">
              Set a goal first — then you’ll get personalized insights here.
            </p>
          ) : (
            <section className="insList">
              <section className="insItem">
                <span className="insLabel">Status</span>
                <span
                  className={`insValue insValue--${monthlyTone(savedThisMonth, expectedMonthly)}`}
                >
                  {monthlyLabel(savedThisMonth, expectedMonthly)}
                </span>
              </section>

              <section className="insItem">
                <span className="insLabel">Next step</span>
                <span className="insValue">
                  {expectedMonthly > 0
                    ? `Aim for ${money(Math.max(0, expectedMonthly - savedThisMonth))} to hit this month`
                    : "Set a target date to get a monthly plan"}
                </span>
              </section>
            </section>
          )}
        </article>

        <article className="card card--soft">
          <h3 className="cardTitle">Goal preview</h3>

          {!hasGoal ? (
            <p className="cardText">
              No goal yet. Tap “View Goal” to create one.
            </p>
          ) : (
            <section className="goalPreview">
              <section className="goalRow">
                <span className="goalName">{goal?.name}</span>
                <span className="goalPct">{Math.round(percent)}%</span>
              </section>

              <section className="goalBar">
                <section
                  className="goalBarFill"
                  style={{ width: `${Math.round(percent)}%` }}
                />
              </section>

              <section className="goalMeta">
                <span>{money(current)} saved</span>
                <span className="metaDot">•</span>
                <span>{money(remaining)} to go</span>
              </section>
            </section>
          )}
        </article>
      </section>
    </section>
  );
}

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
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

function buildSmartMessage({
  hasGoal,
  percent,
  expectedMonthly,
  savedThisMonth,
  remaining,
}) {
  if (!hasGoal) {
    return {
      statusTone: "neutral",
      statusTitle: "Set a goal to start",
      statusSubtitle:
        "Once you set a goal, we’ll guide you with smart insights.",
    };
  }

  const hitMonthly = expectedMonthly > 0 && savedThisMonth >= expectedMonthly;
  const closeMonthly =
    expectedMonthly > 0 && savedThisMonth >= expectedMonthly * 0.7;

  if (percent >= 100) {
    return {
      statusTone: "success",
      statusTitle: "Goal completed 🎉",
      statusSubtitle: "You did it. Set a new goal to keep growing.",
    };
  }

  if (hitMonthly) {
    return {
      statusTone: "success",
      statusTitle: "You’re on track ✅",
      statusSubtitle: `This month’s target is achieved. Only ${money(remaining)} left overall.`,
    };
  }

  if (closeMonthly) {
    return {
      statusTone: "warn",
      statusTitle: "Almost there 🔥",
      statusSubtitle: "You’re close to this month’s target. Keep it up.",
    };
  }

  if (expectedMonthly > 0 && savedThisMonth === 0) {
    return {
      statusTone: "warn",
      statusTitle: "Start this month strong",
      statusSubtitle: "A small deposit today makes a big difference.",
    };
  }

  return {
    statusTone: "neutral",
    statusTitle: "Keep going",
    statusSubtitle:
      expectedMonthly > 0
        ? `You still need ${money(Math.max(0, expectedMonthly - savedThisMonth))} to hit this month’s target.`
        : `You have ${money(remaining)} remaining. Add a target date to get a monthly plan.`,
  };
}

function monthlyTone(saved, expected) {
  if (!expected || expected <= 0) return "neutral";
  if (saved >= expected) return "success";
  if (saved >= expected * 0.7) return "warn";
  return "neutral";
}

function monthlyLabel(saved, expected) {
  if (!expected || expected <= 0) return "No monthly plan yet";
  if (saved >= expected) return "Achieved this month ✅";
  if (saved > 0) return "In progress 🟡";
  return "Not started ⚪";
}
