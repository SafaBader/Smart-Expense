import { useEffect, useState } from "react";
import HeaderBudget from "../../components/Budgets/HeaderBudget/HeaderBudget";
import SummaryBudgets from "../../components/Budgets/SummaryBudgets/SummaryBudgets";
import BudgetAlerts from "../../components/Budgets/BudgetAlerts/BudgetAlerts";
import AllBudgets from "../../components/Budgets/AllBudgets/AllBudgets";
import SetBudgetModal from "../../components/Budgets/SetBudgetModal/SetBudgetModal";

import { getBudgets, addBudget } from "../../services/budgetsService";

function Budgets() {
  const userId = "testUser123"; // مؤقت لحد ما Auth يجهز
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <main>
      <HeaderBudget onSetBudgetClick={() => setIsModalOpen(true)} />

      <SummaryBudgets />
      <BudgetAlerts />

      <AllBudgets budgets={budgets} setBudgets={setBudgets} userId={userId} />

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
