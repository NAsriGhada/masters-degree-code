<script>
  // ---------- Shared benchmark helpers ----------
  const priorities = ["Low", "Medium", "High"];

  function generateTasks(count) {
    const out = [];
    for (let i = 1; i <= count; i++) {
      out.push({
        id: i,
        name: `Task ${i} - ${"x".repeat(10)}`,
        priority: priorities[i % 3]
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
        priority: priorities[(priorities.indexOf(t.priority) + 1) % 3]
      };
    }
    return out;
  }

  function deleteFirstN(tasks, n) {
    return tasks.slice(Math.min(n, tasks.length));
  }

  function nextPaint() {
    return new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );
  }

  async function measure(label, fn) {
    const t0 = performance.now();
    fn();
    await nextPaint();
    const t1 = performance.now();
    return { label, ms: +((t1 - t0).toFixed(2)) };
  }

  // ---------- State ----------
  let tasks = generateTasks(0);

  let name = "";
  let priority = "Medium";

  let editId = null;
  let editName = "";
  let editPriority = "Medium";

  let results = [];

  $: taskCount = tasks.length;
  $: canAdd = name.trim().length > 0;

  // ---------- CRUD ----------
  function addTask() {
    if (!canAdd) return;

    const nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    tasks = [...tasks, { id: nextId, name: name.trim(), priority }];

    name = "";
    priority = "Medium";
  }

  function startEdit(t) {
    editId = t.id;
    editName = t.name;
    editPriority = t.priority;
  }

  function saveEdit() {
    if (editId == null) return;

    const id = editId;
    tasks = tasks.map((t) =>
      t.id === id
        ? { ...t, name: editName.trim() || t.name, priority: editPriority }
        : t
    );
    editId = null;
  }

  function removeTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
  }

  // ---------- Benchmarks ----------
  async function runRenderBench(count) {
    const r = await measure(`Svelte render ${count}`, () => {
      tasks = generateTasks(count);
    });
    results = [r, ...results];
  }

  async function runUpdateBench() {
    const r = await measure(`Svelte update 50`, () => {
      tasks = updateFirstN(tasks, 50);
    });
    results = [r, ...results];
  }

  async function runDeleteBench() {
    const r = await measure(`Svelte delete 50`, () => {
      tasks = deleteFirstN(tasks, 50);
    });
    results = [r, ...results];
  }

  async function runWarmup() {
    await measure("Warmup render 100", () => (tasks = generateTasks(100)));
    await measure("Warmup clear", () => (tasks = []));
  }

  async function runAll() {
    await runWarmup();
    await runRenderBench(100);
    await runRenderBench(500);
    await runRenderBench(1000);
    await runRenderBench(1000);
    await runUpdateBench();
    await runDeleteBench();
  }

  function clearResults() {
    results = [];
  }
</script>

<div style="max-width: 920px; margin: 0 auto; padding: 20px; font-family: system-ui">
  <h1>Svelte DOM Benchmark — Todo</h1>

  <section style="display:flex; gap:12px; align-items:end; flex-wrap:wrap;">
    <div>
      <label>Task</label>
      <input
        bind:value={name}
        placeholder="Task name"
        style="display:block; padding:8px; width:260px;"
      />
    </div>

    <div>
      <label>Priority</label>
      <select bind:value={priority} style="display:block; padding:8px; width:160px;">
        {#each priorities as p}
          <option value={p}>{p}</option>
        {/each}
      </select>
    </div>

    <button on:click={addTask} disabled={!canAdd} style="padding:9px 14px;">Add</button>

    <div style="margin-left:auto;">
      <strong>Total:</strong> {taskCount}
    </div>
  </section>

  <hr style="margin:18px 0;" />

  <section style="display:flex; gap:10px; flex-wrap:wrap;">
    <button on:click={() => runRenderBench(100)}>Render 100</button>
    <button on:click={() => runRenderBench(500)}>Render 500</button>
    <button on:click={() => runRenderBench(1000)}>Render 1000</button>
    <button on:click={runUpdateBench} disabled={taskCount === 0}>Update 50</button>
    <button on:click={runDeleteBench} disabled={taskCount === 0}>Delete 50</button>
    <button on:click={runAll}>Run all</button>
    <button on:click={clearResults}>Clear results</button>
  </section>

  <hr style="margin:18px 0;" />

  {#if editId != null}
    <section style="padding:12px; border:1px solid #ddd; border-radius:8px;">
      <h3 style="margin-top:0;">Edit Task #{editId}</h3>
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:end;">
        <div>
          <label>Name</label>
          <input bind:value={editName} style="display:block; padding:8px; width:320px;" />
        </div>

        <div>
          <label>Priority</label>
          <select bind:value={editPriority} style="display:block; padding:8px; width:160px;">
            {#each priorities as p}
              <option value={p}>{p}</option>
            {/each}
          </select>
        </div>

        <button on:click={saveEdit} style="padding:9px 14px;">Save</button>
        <button on:click={() => (editId = null)} style="padding:9px 14px;">Cancel</button>
      </div>
    </section>
  {/if}

  <h2 style="margin-top:20px;">Tasks</h2>

  <div style="border:1px solid #eee; border-radius:8px; overflow:hidden;">
    {#if tasks.length === 0}
      <p style="padding:12px; margin:0;">No tasks.</p>
    {:else}
      {#each tasks as t (t.id)}
        <div
          style="
            display:grid;
            grid-template-columns: 1fr 120px 160px;
            gap:10px;
            padding:10px;
            border-top:1px solid #eee;
            align-items:center;
          "
        >
          <div><strong>{t.name}</strong></div>
          <div>{t.priority}</div>
          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button on:click={() => startEdit(t)}>Edit</button>
            <button on:click={() => removeTask(t.id)}>Delete</button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <h2 style="margin-top:20px;">Benchmark results</h2>

  {#if results.length === 0}
    <p>No results yet.</p>
  {:else}
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left; border-bottom:1px solid #ddd; padding:8px;">Test</th>
          <th style="text-align:right; border-bottom:1px solid #ddd; padding:8px;">ms</th>
        </tr>
      </thead>
      <tbody>
        {#each results as r, idx (idx)}
          <tr>
            <td style="border-bottom:1px solid #f0f0f0; padding:8px;">{r.label}</td>
            <td style="border-bottom:1px solid #f0f0f0; padding:8px; text-align:right; font-variant-numeric: tabular-nums;">
              {r.ms}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
