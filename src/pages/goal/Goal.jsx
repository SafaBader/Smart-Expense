import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, increment, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

import GoalTopBar from "../../components/goal/goalTopBar/GoalTopBar";
import GoalEmptyState from "../../components/goal/goalEmptyState/GoalEmptyState";
import GoalGrid from "../../components/goal/goalGrid/GoalGrid";
import GoalFormModal from "../../components/goal/goalFormModal/GoalFormModal";
import "./Goal.css";

export default function Goal() {
  const [user, setUser] = useState(null);
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openGoalForm, setOpenGoalForm] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const goalRef = useMemo(() => {
    if (!user) return null;
    return doc(db, "users", user.uid, "goals", "main");
  }, [user]);

  useEffect(() => {
    let alive = true;

    async function loadGoal() {
      if (!goalRef) {
        setGoal(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const snap = await getDoc(goalRef);
        if (!alive) return;

        if (snap.exists()) setGoal(snap.data());
        else setGoal(null);
      } catch (e) {
        console.error("Failed to load goal:", e);
      } finally {
        if (alive) setLoading(false);
      }

    }

    loadGoal();

    return () => {
      alive = false;
    };
  }, [goalRef]);

  const handleSaveGoal = async (form) => {
    if (!goalRef) return alert("User not ready yet. Try again.");

    const derived = deriveGoalFields(form);

    const payload = {
      ...form,
      ...derived,
      updatedAt: serverTimestamp(),
      createdAt: goal?.createdAt || serverTimestamp(),

      streak: typeof goal?.streak === "number" ? goal.streak : 0,
      monthlyStatusByMonth: goal?.monthlyStatusByMonth || {},
      monthlySavedByMonth: goal?.monthlySavedByMonth || {}, 
      activity: goal?.activity || [],
    };

    try {
      await setDoc(goalRef, payload, { merge: true });
      setGoal(payload);
      setOpenGoalForm(false);
    } catch (e) {
      console.error("Failed to save goal:", e);
      alert("Could not save goal. Check Firestore rules / console.");
    }
  };

  const handleApplyMonthlyUpdate = async (depositAmount) => {
    if (!goalRef) return alert("User not ready yet. Try again.");
    if (!goal) return alert("Create a goal first.");

    const amt = Number(depositAmount);
    if (!Number.isFinite(amt) || amt <= 0) return alert("Enter amount > 0.");

    const monthKey = getMonthKey(new Date());

    const prevSavedThisMonth = Number(goal?.monthlySavedByMonth?.[monthKey] || 0);
    const newSavedThisMonth = prevSavedThisMonth + amt;

    const expected = Number(goal.monthlySave || 0);

    const status = computeMonthlyStatus(newSavedThisMonth, expected);

    const prevStatus = goal?.monthlyStatusByMonth?.[monthKey];
    const wasAchievedBefore = prevStatus === "achieved";
    const isAchievedNow = status === "achieved";
    const streakDelta = !wasAchievedBefore && isAchievedNow ? 1 : 0;

    const newCurrent = Number(goal.current || 0) + amt;

    const next = { ...goal, current: newCurrent };
    const derived = deriveGoalFields(next);

    const event = {
      month: monthKey,
      amount: amt,
      expected,
      savedThisMonth: newSavedThisMonth,
      status,
      at: new Date().toISOString(),
    };

    try {
      await setDoc(
        goalRef,
        {
          current: increment(amt),
          ...derived,
          updatedAt: serverTimestamp(),
          lastUpdateAt: serverTimestamp(),

          streak: (goal.streak || 0) + streakDelta,

          [`monthlySavedByMonth.${monthKey}`]: increment(amt),

          [`monthlyStatusByMonth.${monthKey}`]: status,

          activity: arrayUnion(event),
        },
        { merge: true }
      );

      setGoal((prev) => {
        const base = prev || goal;

        const nextMonthlyStatus = { ...(base.monthlyStatusByMonth || {}) };
        nextMonthlyStatus[monthKey] = status;

        const nextMonthlySaved = { ...(base.monthlySavedByMonth || {}) };
        nextMonthlySaved[monthKey] = Number(nextMonthlySaved[monthKey] || 0) + amt;

        return {
          ...base,
          current: newCurrent,
          ...derived,
          streak: (base.streak || 0) + streakDelta,
          monthlyStatusByMonth: nextMonthlyStatus,
          monthlySavedByMonth: nextMonthlySaved,
          activity: [...(base.activity || []), event],
          lastUpdateAt: event.at,
        };
      });
    } catch (e) {
      console.error("Failed to apply monthly update:", e);
      alert("Could not update progress. Check Firestore rules / console.");
    }
  };

  if (!user) return <section className="goalLoading">Loading user...</section>;
  if (loading) return <section className="goalLoading">Loading goal...</section>;

  return (
    <section className="goalPage">
      <GoalTopBar
        hasGoal={!!goal}
        onAddGoal={() => setOpenGoalForm(true)}
        onUpdateGoal={() => setOpenGoalForm(true)}
      />

      {!goal ? (
        <GoalEmptyState onAdd={() => setOpenGoalForm(true)} />
      ) : (
        <GoalGrid goal={goal} onApplyMonthlyUpdate={handleApplyMonthlyUpdate} />
      )}

      <GoalFormModal
        open={openGoalForm}
        onClose={() => setOpenGoalForm(false)}
        initialGoal={goal}
        onSave={handleSaveGoal}
      />
    </section>
  );
}

function deriveGoalFields(form) {
  const target = new Date(String(form.targetDate || "") + "T00:00:00");
  const now = new Date();

  const ms = target.getTime() - now.getTime();
  const daysRemaining = Number.isFinite(ms)
    ? Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
    : 0;

  const monthsLeft = Math.max(0, Math.ceil(daysRemaining / 30));

  const remaining = Math.max(0, Number(form.target) - Number(form.current));
  const monthlySave = monthsLeft ? Math.ceil(remaining / monthsLeft) : remaining;

  return { daysRemaining, monthsLeft, monthlySave };
}

function getMonthKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function computeMonthlyStatus(saved, expected) {
  if (!expected || expected <= 0) return saved > 0 ? "partial" : "missing";
  if (saved >= expected) return "achieved";
  if (saved > 0) return "partial";
  return "missing";
}