import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function getBudgets(userId) {
  const budgetsRef = collection(db, "users", userId, "budgets");
  const snapshot = await getDocs(budgetsRef);
  // `getDocs` gives a one-time fetch only. That is fine, but note that the transactions page uses realtime updates while budgets do not. This inconsistency can confuse users if they expect immediate sync everywhere.
  //None of these functions validate `userId` before building paths. If `userId` is `null` or `undefined`, Firestore calls can fail with hard-to-read runtime errors. Fail early with a clear guard.
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
