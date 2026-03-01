function TxFilters({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  catFilter,
  setCatFilter,
  categories,
}) {
  return (
    <div className="tx-filters">
      <div className="tx-search">
        <span className="tx-search-ico">🔎</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by category or note"
        />
      </div>

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
export default TxFilters;
