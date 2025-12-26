import { useMemo, useState } from "react";
import "./App.css";

// ---------- Shared benchmark helpers ----------
const priorities = ["Low", "Medium", "High"];

function generateTasks(count) {
  const out = [];
  for (let i = 1; i <= count; i++) {
    out.push({
      id: i,
      name: `Task ${i} - ${"x".repeat(10)}`, // keep string length stable
      priority: priorities[i % 3],
    });
  }
  return out;
}

function updateFirstN(tasks, n) {
  const out = tasks.slice();
  const limit = Math.min(n, out.length);
  for (let i = 0; i < limit; i++) {
    const t = out[i];
    out[i] = {
      ...t,
      name: `${t.name} (edited)`,
      priority: priorities[(priorities.indexOf(t.priority) + 1) % 3],
    };
  }
  return out;
}

function deleteFirstN(tasks, n) {
  return tasks.slice(Math.min(n, tasks.length));
}

function nextPaint() {
  // two RAFs = more reliable "DOM is painted" signal
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  );
}

async function measure(label, fn) {
  const t0 = performance.now();
  fn();
  await nextPaint();
  const t1 = performance.now();
  return { label, ms: +(t1 - t0).toFixed(2) };
}

// ---------- UI ----------
export default function App() {
  const [tasks, setTasks] = useState(() => generateTasks(0));
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  const [results, setResults] = useState([]);

  const taskCount = tasks.length;

  const canAdd = useMemo(() => name.trim().length > 0, [name]);

  function addTask() {
    if (!canAdd) return;
    setTasks((prev) => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [...prev, { id: nextId, name: name.trim(), priority }];
    });
    setName("");
    setPriority("Medium");
  }

  function startEdit(t) {
    setEditId(t.id);
    setEditName(t.name);
    setEditPriority(t.priority);
  }

  function saveEdit() {
    if (editId == null) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editId
          ? { ...t, name: editName.trim() || t.name, priority: editPriority }
          : t
      )
    );
    setEditId(null);
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // ---------- Benchmark actions ----------
  async function runRenderBench(count) {
    const r = await measure(`React render ${count}`, () =>
      setTasks(generateTasks(count))
    );
    setResults((prev) => [r, ...prev]);
  }

  async function runUpdateBench() {
    const r = await measure(`React update 50`, () =>
      setTasks((prev) => updateFirstN(prev, 50))
    );
    setResults((prev) => [r, ...prev]);
  }

  async function runDeleteBench() {
    const r = await measure(`React delete 50`, () =>
      setTasks((prev) => deleteFirstN(prev, 50))
    );
    setResults((prev) => [r, ...prev]);
  }

  async function runWarmup() {
    // quick warm-up: render 100 then clear
    await measure("Warmup render 100", () => setTasks(generateTasks(100)));
    await measure("Warmup clear", () => setTasks([]));
  }

  async function runAll() {
    await runWarmup();
    // render
    await runRenderBench(100);
    await runRenderBench(500);
    await runRenderBench(1000);
    // update + delete (on large list to stress)
    await runRenderBench(1000);
    await runUpdateBench();
    await runDeleteBench();
  }

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: 20,
        fontFamily: "system-ui",
      }}
    >
      <h1>React DOM Benchmark — Todo</h1>

      <section
        style={{
          display: "flex",
          gap: 12,
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label>Task</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name"
            style={{ display: "block", padding: 8, width: 260 }}
          />
        </div>

        <div>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ display: "block", padding: 8, width: 160 }}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addTask}
          disabled={!canAdd}
          style={{ padding: "9px 14px" }}
        >
          Add
        </button>

        <div style={{ marginLeft: "auto" }}>
          <strong>Total:</strong> {taskCount}
        </div>
      </section>

      <hr style={{ margin: "18px 0" }} />

      <section style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => runRenderBench(100)}>Render 100</button>
        <button onClick={() => runRenderBench(500)}>Render 500</button>
        <button onClick={() => runRenderBench(1000)}>Render 1000</button>
        <button onClick={runUpdateBench} disabled={taskCount === 0}>
          Update 50
        </button>
        <button onClick={runDeleteBench} disabled={taskCount === 0}>
          Delete 50
        </button>
        <button onClick={runAll}>Run all</button>
        <button onClick={() => setResults([])}>Clear results</button>
      </section>

      <hr style={{ margin: "18px 0" }} />

      {/* Edit panel */}
      {editId != null && (
        <section
          style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
        >
          <h3 style={{ marginTop: 0 }}>Edit Task #{editId}</h3>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "end",
            }}
          >
            <div>
              <label>Name</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ display: "block", padding: 8, width: 320 }}
              />
            </div>
            <div>
              <label>Priority</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                style={{ display: "block", padding: 8, width: 160 }}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={saveEdit} style={{ padding: "9px 14px" }}>
              Save
            </button>
            <button
              onClick={() => setEditId(null)}
              style={{ padding: "9px 14px" }}
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      <h2 style={{ marginTop: 20 }}>Tasks</h2>
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {tasks.length === 0 ? (
          <p style={{ padding: 12, margin: 0 }}>No tasks.</p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 160px",
                gap: 10,
                padding: 10,
                borderTop: "1px solid #eee",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{t.name}</strong>
              </div>
              <div>{t.priority}</div>
              <div
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
              >
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => removeTask(t.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <h2 style={{ marginTop: 20 }}>Benchmark results</h2>
      {results.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Test
              </th>
              <th
                style={{
                  textAlign: "right",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                ms
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                  {r.label}
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    padding: 8,
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {r.ms}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
