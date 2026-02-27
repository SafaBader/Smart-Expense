import { useEffect, useMemo, useState } from "react";
import "../../pages/Transactions/TransactionsPage.css";
import { db, auth } from "../../firebase/firebase";
// Firestore functions
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import TxStatCard from "../../components/Transactions/TxStatCard";
import TxFilters from "../../components/Transactions/TxFilters";
import TxTable from "../../components/Transactions/TxTable";
import TxModal from "../../components/Transactions/TxModal";

// List categories
const CATEGORIES = [
  "Food",
  "Transport",
  "Freelance",
  "Entertainment",
  "Bills",
  "Other",
];

export default function TransactionsPage() {
  // Store all transactions
  const [items, setItems] = useState([]);

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Control modal open/close
  const [open, setOpen] = useState(false);

  // Search text
  const [search, setSearch] = useState("");

  // Filter by type
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter by category
  const [catFilter, setCatFilter] = useState("all");

  // Store current user ID
  const [uid, setUid] = useState(null);

  // Store form data
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10), // today date
    type: "expense",
    category: "Other",
    note: "",
    amount: "",
  });

  // Listen to authentication state
  useEffect(() => {
    // This runs when user logs in or logs out
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid); // save user ID
      } else {
        setUid(null); // no user
      }
    });

    // cleanup listener
    return () => unsubscribe();
  }, []);

  // Listen to user's transactions
  useEffect(() => {
    if (!uid) {
      setItems([]); // clear transactions
      setLoading(false); // stop loading
      return;
    }

    setLoading(true); // start loading

    // Path: users/{uid}/transactions
    const q = query(
      collection(db, "users", uid, "transactions"),
      orderBy("createdAt", "desc"), // newest first
    );

    // Realtime listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Convert documents to array
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(data); // save transactions
      setLoading(false); // stop loading
    });

    // cleanup listener
    return () => unsubscribe();
  }, [uid]);

  // Calculate totals
  const totals = useMemo(() => {
    const income = items
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = items
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [items]);

  // Filter transactions
  const filtered = useMemo(() => {
    const text = search.toLowerCase();

    return items
      .filter(
        (t) =>
          t.note?.toLowerCase().includes(text) ||
          t.category?.toLowerCase().includes(text),
      )
      .filter((t) => typeFilter === "all" || t.type === typeFilter)
      .filter((t) => catFilter === "all" || t.category === catFilter);
  }, [items, search, typeFilter, catFilter]);

  // Add transaction
  async function addTransaction(e) {
    e.preventDefault(); // stop page reload

    if (!uid) return;

    await addDoc(collection(db, "users", uid, "transactions"), {
      date: form.date,
      type: form.type,
      category: form.category,
      note: form.note,
      amount: Number(form.amount),
      createdAt: serverTimestamp(),
    });

    // reset form
    setForm({
      ...form,
      note: "",
      amount: "",
    });

    setOpen(false); // close modal
  }

  // Delete transaction
  async function removeTransaction(id) {
    await deleteDoc(doc(db, "users", uid, "transactions", id));
  }

  return (
    <div className="tx-page">
      <div className="tx-top">
        <div>
          <h1 className="tx-title">Transactions</h1>
          <p className="tx-sub">Track all your income and expenses</p>
        </div>

        <button className="tx-btn" onClick={() => setOpen(true)}>
          <span className="tx-plus">+</span> Add Transaction
        </button>
      </div>

      <div className="tx-cards">
        <TxStatCard
          label="Total Income"
          value={totals.income}
          tone="good"
          icon="↗"
        />
        <TxStatCard
          label="Total Expenses"
          value={totals.expense}
          tone="bad"
          icon="↘"
        />
        <TxStatCard
          label="Net Balance"
          value={totals.balance}
          tone="info"
          icon="$"
        />
      </div>

      <TxFilters
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        catFilter={catFilter}
        setCatFilter={setCatFilter}
        categories={CATEGORIES}
      />

      <TxTable
        items={filtered}
        loading={loading}
        onDelete={removeTransaction}
      />

      {open && (
        <TxModal
          form={form}
          setForm={setForm}
          categories={CATEGORIES}
          onClose={() => setOpen(false)}
          onSubmit={addTransaction}
        />
      )}
    </div>
  );
}
