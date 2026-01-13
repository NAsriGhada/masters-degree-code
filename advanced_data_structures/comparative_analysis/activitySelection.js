
const { performance } = require("perf_hooks");

/**
 * Task: { start: number, end: number }
 * Assumption: A task is compatible with another if it starts at or after the previous end:
 *             next.start >= prev.end  (end is treated as "exclusive")
 */

// ---------- Helpers ----------
function sortByEndThenStart(tasks) {
  return [...tasks].sort((a, b) => a.end - b.end || a.start - b.start);
}

function isNonOverlappingSchedule(schedule) {
  for (let i = 1; i < schedule.length; i++) {
    if (schedule[i].start < schedule[i - 1].end) return false;
  }
  return true;
}

// ---------- Greedy (Earliest End Time) ----------
// Time: O(n log n) due to sorting
// Space: O(n) for sorted copy + selected list
function selectMaxTasksGreedy(tasks) {
  const sorted = sortByEndThenStart(tasks);
  const selected = [];

  let lastEnd = -Infinity;
  for (const t of sorted) {
    if (t.start >= lastEnd) {
      selected.push(t);
      lastEnd = t.end;
    }
  }
  return selected;
}

// ---------- Brute Force (Exact, Exponential) ----------
// This explores combinations via recursion, after sorting by end time for pruning.
// Time: O(2^n) worst-case
// Space: O(n) recursion depth + current selection
function selectMaxTasksBruteForce(tasks, maxN = 25) {
  if (tasks.length > maxN) {
    throw new Error(
      `Brute force refused: n=${tasks.length} is too large. Exponential blow-up. ` +
        `Try n<=${maxN} for brute force testing.`
    );
  }

  const sorted = sortByEndThenStart(tasks);
  let best = [];

  function dfs(i, current, lastEnd) {
    // If remaining tasks can't beat best, you could add pruning here.
    if (i === sorted.length) {
      if (current.length > best.length) best = current.slice();
      return;
    }

    // Option 1: skip task i
    dfs(i + 1, current, lastEnd);

    // Option 2: take task i if compatible
    const t = sorted[i];
    if (t.start >= lastEnd) {
      current.push(t);
      dfs(i + 1, current, t.end);
      current.pop();
    }
  }

  dfs(0, [], -Infinity);
  return best;
}

// ---------- Random Task Generator ----------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates tasks with start < end
function generateRandomTasks(n, maxTime = 100000, maxDuration = 1000) {
  const tasks = [];
  for (let i = 0; i < n; i++) {
    const start = randomInt(0, maxTime - 1);
    const duration = randomInt(1, maxDuration);
    const end = Math.min(maxTime, start + duration);
    tasks.push({ start, end });
  }
  return tasks;
}

// ---------- Stress Test Generators ----------
function generateAllOverlapping(n) {
  // Everyone overlaps: same big interval
  const tasks = [];
  for (let i = 0; i < n; i++) tasks.push({ start: 0, end: 1000 });
  return tasks;
}

function generateAllNonOverlapping(n) {
  // Perfect chain, no overlap
  const tasks = [];
  for (let i = 0; i < n; i++) tasks.push({ start: i * 10, end: i * 10 + 5 });
  return tasks;
}

function generateSameStartOrEnd(n) {
  // Many with same start, varying end + many with same end, varying start
  const tasks = [];
  for (let i = 0; i < n; i++)
    tasks.push({ start: 100, end: 100 + (i % 50) + 1 });
  for (let i = 0; i < n; i++) tasks.push({ start: i % 50, end: 500 });
  return tasks;
}

// ---------- Timing Utility ----------
function timeIt(label, fn) {
  const t0 = performance.now();
  const result = fn();
  const t1 = performance.now();
  console.log(`${label}: ${(t1 - t0).toFixed(2)} ms`);
  return result;
}

// ---------- Provided Sample Input ----------
const sampleTasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 },
];

console.log("=== 1) Validate correctness on sample ===");
const greedySample = selectMaxTasksGreedy(sampleTasks);
const bruteSample = selectMaxTasksBruteForce(sampleTasks);

console.log("Greedy selected:", greedySample);
console.log("Brute selected: ", bruteSample);
console.log("Same count?", greedySample.length === bruteSample.length);
console.log("Greedy valid schedule?", isNonOverlappingSchedule(greedySample));
console.log("Brute valid schedule? ", isNonOverlappingSchedule(bruteSample));
console.log("Max tasks =", greedySample.length);
console.log();

// ---------- Large Input Timing ----------
console.log("=== 2) Timing on ~10,000 random tasks ===");
const big = generateRandomTasks(10000);

const greedyBig = timeIt("Greedy (n=10000)", () => selectMaxTasksGreedy(big));
console.log("Greedy selected count:", greedyBig.length);

// Brute force at 10k is impossible (2^10000 combinations).
// We demonstrate brute force timing on a small subset instead.
const smallForBrute = big.slice(0, 22);
const bruteSmall = timeIt("Brute Force (n=22 subset)", () =>
  selectMaxTasksBruteForce(smallForBrute)
);
console.log("Brute selected count (subset):", bruteSmall.length);
console.log();

// ---------- 5) Bonus Stress Tests ----------
console.log("=== 5) Stress tests ===");

const overlapCase = generateAllOverlapping(10000);
const overlapGreedy = timeIt("Greedy all-overlapping (n=10000)", () =>
  selectMaxTasksGreedy(overlapCase)
);
console.log("Selected:", overlapGreedy.length, "(expected 1)");
console.log();

const nonOverlapCase = generateAllNonOverlapping(10000);
const nonOverlapGreedy = timeIt("Greedy all-non-overlapping (n=10000)", () =>
  selectMaxTasksGreedy(nonOverlapCase)
);
console.log("Selected:", nonOverlapGreedy.length, "(expected 10000)");
console.log();

const sameStartEndCase = generateSameStartOrEnd(5000); // total 10k tasks
const sameStartEndGreedy = timeIt(
  "Greedy same start/end patterns (~10000)",
  () => selectMaxTasksGreedy(sameStartEndCase)
);
console.log("Selected:", sameStartEndGreedy.length);
console.log();

// Optional: brute on small edge cases
const overlapSmall = generateAllOverlapping(22);
timeIt("Brute all-overlapping (n=22)", () =>
  selectMaxTasksBruteForce(overlapSmall)
);
const nonOverlapSmall = generateAllNonOverlapping(22);
timeIt("Brute all-non-overlapping (n=22)", () =>
  selectMaxTasksBruteForce(nonOverlapSmall)
);
