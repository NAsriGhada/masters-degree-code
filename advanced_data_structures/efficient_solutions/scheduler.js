class TaskScheduler {
  constructor(tasks = []) {
    this.tasks = [];
    for (const t of tasks) this.addTask(t);
  }

  // --- Helpers ---
  static timeToMinutes(timeStr) {
    // "HH:MM" -> minutes
    const [hh, mm] = timeStr.split(":").map(Number);
    return hh * 60 + mm;
  }

  static minutesToTime(m) {
    const hh = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  static isValidPriority(p) {
    return p === "High" || p === "Medium" || p === "Low";
  }

  addTask(task) {
    const { name, start, end, priority } = task;

    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Task name must be a non-empty string.");
    }
    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      start < 0 ||
      end < 0
    ) {
      throw new Error("Start/end must be non-negative numbers (minutes).");
    }
    if (start >= end) {
      throw new Error(`Invalid interval for "${name}": start must be < end.`);
    }
    if (!TaskScheduler.isValidPriority(priority)) {
      throw new Error(`Invalid priority for "${name}". Use High/Medium/Low.`);
    }

    this.tasks.push({ name: name.trim(), start, end, priority });
  }

  // 1) Sort tasks by start time (efficiently)
  // Time: O(n log n), Space: O(log n) to O(n) depending on engine sort implementation
  getTasksSortedByStart() {
    // Avoid mutating original list
    return [...this.tasks].sort((a, b) => a.start - b.start || a.end - b.end);
  }

  // 2) Group tasks by priority using a hash map (Map)
  // Time: O(n), Space: O(n)
  groupByPriority() {
    const groups = new Map([
      ["High", []],
      ["Medium", []],
      ["Low", []],
    ]);

    for (const task of this.tasks) {
      groups.get(task.priority).push(task);
    }
    return groups;
  }

  // 3) Detect overlapping tasks
  // Efficient approach: sort by start, then check neighbors
  // Time: O(n log n), Space: O(n) for sorted copy + overlaps output
  detectOverlaps() {
    const sorted = this.getTasksSortedByStart();
    const overlaps = [];

    // We only need to compare current task with the "active" one that ends last so far
    let active = sorted[0] || null;

    for (let i = 1; i < sorted.length; i++) {
      const current = sorted[i];
      if (!active) {
        active = current;
        continue;
      }

      // Overlap condition: current starts before active ends
      // (Assuming end is exclusive. If you consider end inclusive, adjust accordingly.)
      if (current.start < active.end) {
        overlaps.push({
          a: active,
          b: current,
          overlapStart: Math.max(active.start, current.start),
          overlapEnd: Math.min(active.end, current.end),
        });

        // Keep the task that ends later as active (so we catch overlaps with future tasks)
        if (current.end > active.end) active = current;
      } else {
        active = current;
      }
    }

    return overlaps;
  }

  // 4) Optional: rough memory usage estimate
  // This is a very approximate estimate (JS engine overhead varies).
  // Time: O(1)
  estimateMemoryBytes() {
    // Rough guess per task:
    // - name string: ~2 bytes/char + overhead (approx)
    // - numbers + references overhead
    // We'll do a simple model:
    let total = 0;
    for (const t of this.tasks) {
      const nameBytes = 2 * t.name.length + 40; // string overhead guess
      const fieldsBytes = 8 + 8 + 8 + 16; // start/end/refs rough guess
      total += nameBytes + fieldsBytes;
    }
    // plus array overhead guess
    total += 24 + this.tasks.length * 8;
    return total;
  }
}

// --------------------
// Example testing
// --------------------
const scheduler = new TaskScheduler([
  {
    name: "Breakfast",
    start: TaskScheduler.timeToMinutes("08:00"),
    end: TaskScheduler.timeToMinutes("08:30"),
    priority: "Low",
  },
  {
    name: "Meeting",
    start: TaskScheduler.timeToMinutes("08:15"),
    end: TaskScheduler.timeToMinutes("09:00"),
    priority: "High",
  },
  {
    name: "Coding",
    start: TaskScheduler.timeToMinutes("09:00"),
    end: TaskScheduler.timeToMinutes("11:00"),
    priority: "High",
  },
  {
    name: "Emails",
    start: TaskScheduler.timeToMinutes("10:30"),
    end: TaskScheduler.timeToMinutes("11:15"),
    priority: "Medium",
  },
]);

console.log("Sorted by start:");
console.table(
  scheduler.getTasksSortedByStart().map((t) => ({
    name: t.name,
    start: TaskScheduler.minutesToTime(t.start),
    end: TaskScheduler.minutesToTime(t.end),
    priority: t.priority,
  }))
);

console.log("\nGrouped by priority:");
const groups = scheduler.groupByPriority();
for (const [p, list] of groups.entries()) {
  console.log(
    p,
    "=>",
    list.map((t) => t.name)
  );
}

console.log("\nOverlaps:");
const overlaps = scheduler.detectOverlaps();
for (const o of overlaps) {
  console.log(
    `${o.a.name} overlaps ${o.b.name} from ${TaskScheduler.minutesToTime(
      o.overlapStart
    )} to ${TaskScheduler.minutesToTime(o.overlapEnd)}`
  );
}

console.log("\nEstimated memory (bytes):", scheduler.estimateMemoryBytes());
