import { useEffect, useMemo, useState } from "react";
import HeaderBudget from "../../components/Budgets/HeaderBudget/HeaderBudget";
import SummaryBudgets from "../../components/Budgets/SummaryBudgets/SummaryBudgets";
import BudgetAlerts from "../../components/Budgets/BudgetAlerts/BudgetAlerts";
import AllBudgets from "../../components/Budgets/AllBudgets/AllBudgets";
import SetBudgetModal from "../../components/Budgets/SetBudgetModal/SetBudgetModal";

import { getBudgets, addBudget } from "../../services/budgetsService";

function Budgets() {
  const userId = "testUser123";
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockTransactions = [
    { type: "expense", amount: 200, categoryId: "Food" },
    { type: "expense", amount: 120, categoryId: "Shopping" },
    { type: "expense", amount: 80, categoryId: "Transport" },
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await getBudgets(userId);
      setBudgets(data);
    }
    fetchData();
  }, []);

  async function handleCreateBudget(newBudget) {
    await addBudget(userId, newBudget);
    const updated = await getBudgets(userId);
    setBudgets(updated);
  }

  const spentMap = useMemo(() => {
    const map = new Map();

    for (const t of mockTransactions) {
      if (t.type !== "expense") continue;

      const key = String(t.categoryId || "").toLowerCase();
      const amount = Number(t.amount) || 0;

      map.set(key, (map.get(key) || 0) + amount);
    }

    return map;
  }, []);

  const budgetsWithSpent = useMemo(() => {
    return budgets.map((b) => {
      const key = String(b.name || "").toLowerCase();
      const spent = spentMap.get(key) || 0;

      return {
        ...b,
        spent,
        limit: Number(b.monthlyLimit) || 0,
      };
    });
  }, [budgets, spentMap]);

  const totals = useMemo(() => {
    const totalBudget = budgetsWithSpent.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgetsWithSpent.reduce((sum, b) => sum + b.spent, 0);

    return {
      totalBudget,
      totalSpent,
      remaining: totalBudget - totalSpent,
    };
  }, [budgetsWithSpent]);

  const alerts = useMemo(() => {
    function getStatus(spent, limit) {
      if (limit <= 0) return "normal";
      const percent = (spent / limit) * 100;

      if (percent >= 100) return "exceeded";
      if (percent >= 80) return "warning";
      if (percent >= 60) return "approaching";
      return "normal";
    }

    return budgetsWithSpent
      .map((b) => {
        const status = getStatus(b.spent, b.limit);
        const percent = b.limit <= 0 ? 0 : (b.spent / b.limit) * 100;

        return {
          id: b.id,
          name: b.name,
          spent: b.spent,
          limit: b.limit,
          type: status,
          percent,
        };
      })
      .filter((a) => a.type !== "normal");
  }, [budgetsWithSpent]);

  return (
    <main>
      <HeaderBudget onSetBudgetClick={() => setIsModalOpen(true)} />

      <SummaryBudgets totals={totals} />
      <BudgetAlerts alerts={alerts} />

      <AllBudgets
        budgets={budgetsWithSpent}
        setBudgets={setBudgets}
        userId={userId}
      />

      <SetBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingBudgets={budgets}
        onCreate={handleCreateBudget}
      />
    </main>
  );
}

export default Budgets;
