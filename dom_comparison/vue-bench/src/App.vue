<script setup>
import { computed, reactive, ref } from "vue";

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
const tasks = ref(generateTasks(0));

const name = ref("");
const priority = ref("Medium");

const editId = ref(null);
const editName = ref("");
const editPriority = ref("Medium");

const results = ref([]);

const taskCount = computed(() => tasks.value.length);
const canAdd = computed(() => name.value.trim().length > 0);

// ---------- CRUD ----------
function addTask() {
  if (!canAdd.value) return;
  const prev = tasks.value;
  const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;

  // replace array for predictable re-render timing
  tasks.value = [...prev, { id: nextId, name: name.value.trim(), priority: priority.value }];

  name.value = "";
  priority.value = "Medium";
}

function startEdit(t) {
  editId.value = t.id;
  editName.value = t.name;
  editPriority.value = t.priority;
}

function saveEdit() {
  if (editId.value == null) return;
  const id = editId.value;

  tasks.value = tasks.value.map((t) =>
    t.id === id
      ? { ...t, name: editName.value.trim() || t.name, priority: editPriority.value }
      : t
  );

  editId.value = null;
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
}

// ---------- Benchmarks ----------
async function runRenderBench(count) {
  const r = await measure(`Vue render ${count}`, () => {
    tasks.value = generateTasks(count);
  });
  results.value = [r, ...results.value];
}

async function runUpdateBench() {
  const r = await measure(`Vue update 50`, () => {
    tasks.value = updateFirstN(tasks.value, 50);
  });
  results.value = [r, ...results.value];
}

async function runDeleteBench() {
  const r = await measure(`Vue delete 50`, () => {
    tasks.value = deleteFirstN(tasks.value, 50);
  });
  results.value = [r, ...results.value];
}

async function runWarmup() {
  await measure("Warmup render 100", () => {
    tasks.value = generateTasks(100);
  });
  await measure("Warmup clear", () => {
    tasks.value = [];
  });
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
  results.value = [];
}
</script>

<template>
  <div style="max-width: 920px; margin: 0 auto; padding: 20px; font-family: system-ui">
    <h1>Vue DOM Benchmark — Todo</h1>

    <section style="display: flex; gap: 12px; align-items: end; flex-wrap: wrap">
      <div>
        <label>Task</label>
        <input
          v-model="name"
          placeholder="Task name"
          style="display: block; padding: 8px; width: 260px"
        />
      </div>

      <div>
        <label>Priority</label>
        <select v-model="priority" style="display: block; padding: 8px; width: 160px">
          <option v-for="p in priorities" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </div>

      <button @click="addTask" :disabled="!canAdd" style="padding: 9px 14px">
        Add
      </button>

      <div style="margin-left: auto">
        <strong>Total:</strong> {{ taskCount }}
      </div>
    </section>

    <hr style="margin: 18px 0" />

    <section style="display: flex; gap: 10px; flex-wrap: wrap">
      <button @click="runRenderBench(100)">Render 100</button>
      <button @click="runRenderBench(500)">Render 500</button>
      <button @click="runRenderBench(1000)">Render 1000</button>
      <button @click="runUpdateBench" :disabled="taskCount === 0">Update 50</button>
      <button @click="runDeleteBench" :disabled="taskCount === 0">Delete 50</button>
      <button @click="runAll">Run all</button>
      <button @click="clearResults">Clear results</button>
    </section>

    <hr style="margin: 18px 0" />

    <!-- Edit panel -->
    <section
      v-if="editId != null"
      style="padding: 12px; border: 1px solid #ddd; border-radius: 8px"
    >
      <h3 style="margin-top: 0">Edit Task #{{ editId }}</h3>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: end">
        <div>
          <label>Name</label>
          <input v-model="editName" style="display: block; padding: 8px; width: 320px" />
        </div>

        <div>
          <label>Priority</label>
          <select
            v-model="editPriority"
            style="display: block; padding: 8px; width: 160px"
          >
            <option v-for="p in priorities" :key="p" :value="p">
              {{ p }}
            </option>
          </select>
        </div>

        <button @click="saveEdit" style="padding: 9px 14px">Save</button>
        <button @click="editId = null" style="padding: 9px 14px">Cancel</button>
      </div>
    </section>

    <h2 style="margin-top: 20px">Tasks</h2>

    <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden">
      <p v-if="tasks.length === 0" style="padding: 12px; margin: 0">No tasks.</p>

      <div
        v-else
        v-for="t in tasks"
        :key="t.id"
        style="
          display: grid;
          grid-template-columns: 1fr 120px 160px;
          gap: 10px;
          padding: 10px;
          border-top: 1px solid #eee;
          align-items: center;
        "
      >
        <div><strong>{{ t.name }}</strong></div>
        <div>{{ t.priority }}</div>
        <div style="display: flex; gap: 8px; justify-content: flex-end">
          <button @click="startEdit(t)">Edit</button>
          <button @click="removeTask(t.id)">Delete</button>
        </div>
      </div>
    </div>

    <h2 style="margin-top: 20px">Benchmark results</h2>

    <p v-if="results.length === 0">No results yet.</p>

    <table v-else style="width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px">
            Test
          </th>
          <th style="text-align: right; border-bottom: 1px solid #ddd; padding: 8px">
            ms
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, idx) in results" :key="idx">
          <td style="border-bottom: 1px solid #f0f0f0; padding: 8px">
            {{ r.label }}
          </td>
          <td
            style="
              border-bottom: 1px solid #f0f0f0;
              padding: 8px;
              text-align: right;
              font-variant-numeric: tabular-nums;
            "
          >
            {{ r.ms }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
