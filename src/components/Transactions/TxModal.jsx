function TxModal({ form, setForm, categories, onClose, onSubmit }) {
  return (
    <div className="tx-modal-overlay" onClick={onClose}>
      <div className="tx-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tx-modal-head">
          <h3>Add Transaction</h3>
          <button className="tx-x" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="tx-form">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <label>Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            list="category-options"
            placeholder="Enter or select category"
          />

          <datalist id="category-options">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>

          <label>Note</label>
          <input
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder=""
          />

          <label>Amount</label>
          <input
            type="number"
            value={form.amount}
            // * `amount` is accepted as any numeric string, including negative values and empty values. This should be validated before submission.

            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <button className="tx-btn tx-btn-full" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default TxModal;
