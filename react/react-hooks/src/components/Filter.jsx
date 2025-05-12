function Filter({ filterTitle, setFilterTitle, filterRate, setFilterRate }) {
  return (
    <div className="container my-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search by title"
        value={filterTitle}
        onChange={(e) => setFilterTitle(e.target.value)}
      />
      <input
        type="number"
        className="form-control"
        placeholder="Minimum rating"
        value={filterRate}
        onChange={(e) => setFilterRate(Number(e.target.value))}
      />
    </div>
  );
}

export default Filter;
