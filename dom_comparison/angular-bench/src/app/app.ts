import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Priority = 'Low' | 'Medium' | 'High';

type Task = {
  id: number;
  name: string;
  priority: Priority;
};

const priorities: Priority[] = ['Low', 'Medium', 'High'];

// ---------- Shared benchmark helpers ----------
function generateTasks(count: number): Task[] {
  const out: Task[] = [];
  for (let i = 1; i <= count; i++) {
    out.push({
      id: i,
      name: `Task ${i} - ${'x'.repeat(10)}`, // keep string length stable
      priority: priorities[i % 3],
    });
  }
  return out;
}

function updateFirstN(tasks: Task[], n: number): Task[] {
  const out = tasks.slice();
  const limit = Math.min(n, out.length);
  for (let i = 0; i < limit; i++) {
    const t = out[i];
    const idx = priorities.indexOf(t.priority);
    out[i] = {
      ...t,
      name: `${t.name} (edited)`,
      priority: priorities[(idx + 1) % 3],
    };
  }
  return out;
}

function deleteFirstN(tasks: Task[], n: number): Task[] {
  return tasks.slice(Math.min(n, tasks.length));
}

function nextPaint(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  // ---------- State ----------
  tasks: Task[] = generateTasks(0);

  name = '';
  priority: Priority = 'Medium';

  editId: number | null = null;
  editName = '';
  editPriority: Priority = 'Medium';

  results: { label: string; ms: number }[] = [];

  // ---------- Derived ----------
  get taskCount() {
    return this.tasks.length;
  }

  get canAdd() {
    return this.name.trim().length > 0;
  }

  trackById = (_: number, t: Task) => t.id;

  // ---------- CRUD ----------
  addTask() {
    if (!this.canAdd) return;

    const nextId = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    this.tasks = [...this.tasks, { id: nextId, name: this.name.trim(), priority: this.priority }];

    this.name = '';
    this.priority = 'Medium';
  }

  startEdit(t: Task) {
    this.editId = t.id;
    this.editName = t.name;
    this.editPriority = t.priority;
  }

  saveEdit() {
    if (this.editId == null) return;

    const id = this.editId;
    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, name: this.editName.trim() || t.name, priority: this.editPriority } : t
    );

    this.editId = null;
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  // ---------- Benchmark core ----------
  private async measure(label: string, fn: () => void) {
    const t0 = performance.now();
    fn();
    await nextPaint();
    const t1 = performance.now();
    const r = { label, ms: +(t1 - t0).toFixed(2) };
    this.results = [r, ...this.results];
  }

  async runRenderBench(count: number) {
    await this.measure(`Angular render ${count}`, () => {
      this.tasks = generateTasks(count);
    });
  }

  async runUpdateBench() {
    await this.measure(`Angular update 50`, () => {
      this.tasks = updateFirstN(this.tasks, 50);
    });
  }

  async runDeleteBench() {
    await this.measure(`Angular delete 50`, () => {
      this.tasks = deleteFirstN(this.tasks, 50);
    });
  }

  async runWarmup() {
    // warm-up run (not recorded in results)
    const t0 = performance.now();
    this.tasks = generateTasks(100);
    await nextPaint();
    this.tasks = [];
    await nextPaint();
    const t1 = performance.now();
    // optional: log warmup time
    console.log('Warmup total ms:', (t1 - t0).toFixed(2));
  }

  async runAll() {
    await this.runWarmup();
    await this.runRenderBench(100);
    await this.runRenderBench(500);
    await this.runRenderBench(1000);
    await this.runRenderBench(1000);
    await this.runUpdateBench();
    await this.runDeleteBench();
  }

  clearResults() {
    this.results = [];
  }
}
