import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function getBudgets(userId) {
  const budgetsRef = collection(db, "users", userId, "budgets");
  const snapshot = await getDocs(budgetsRef);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function addBudget(userId, budgetData) {
  const budgetsRef = collection(db, "users", userId, "budgets");
  await addDoc(budgetsRef, budgetData);
}

export async function updateBudget(userId, budgetId, data) {
  const budgetRef = doc(db, "users", userId, "budgets", budgetId);
  await updateDoc(budgetRef, data);
}

export async function deleteBudget(userId, budgetId) {
  const budgetRef = doc(db, "users", userId, "budgets", budgetId);
  await deleteDoc(budgetRef);
}
