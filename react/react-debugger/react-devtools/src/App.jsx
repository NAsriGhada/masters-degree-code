import { useEffect, useMemo, useState } from "react";

const data = [
  { id: "a1", title: "Buy milk" },
  { id: "b2", title: "Write report" },
  { id: "c3", title: "Train legs" },
];

function Counter({ start = 0, auto = true }) {
  const [count, setCount] = useState(start);

  // BUG 1: stale closure in setInterval (count never increases correctly)
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setCount(count + 1); // ❌ should use functional updater
    }, 1000);
    return () => clearInterval(id);
  }, [auto]); // ❌ missing "count" but we actually want functional updater

  return (
    <div style={{ border: "1px solid #ddd", padding: 8, borderRadius: 8 }}>
      <strong>Counter:</strong> {count}
      <button onClick={() => setCount(count + 1)} style={{ marginLeft: 8 }}>
        +1
      </button>
    </div>
  );
}

function TodoItem({ title }) {
  return <li>{title}</li>;
}

function TodoList({ items }) {
  const [filter, setFilter] = useState("");

  // BUG 2: wrong prop name passed to TodoItem
  // BUG 3: using array index as key (bad when reordering/filtering)
  const filtered = useMemo(() => {
    // BUG 4: missing dependency "filter" would make this stale; included on purpose
    return items.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()));
  }, []); // ❌ should depend on [items, filter]

  return (
    <div style={{ border: "1px solid #ddd", padding: 8, borderRadius: 8, marginTop: 12 }}>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Filter todos…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <ul>
        {filtered.map((t, i) => (
          <TodoItem key={i} text={t.title} /> /* ❌ wrong prop; ❌ index key */
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>React DevTools Checkpoint</h1>
      <Counter start={0} auto />
      <TodoList items={data} />
    </div>
  );
}
