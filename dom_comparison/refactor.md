## Benchmark plan (same for React / Angular / Vue / Svelte)

**Task model**
- { id: number, name: string, priority: "Low" | "Medium" | "High" }

**Operations measured**
1. Initial render: 100 / 500 / 1000 tasks
2. Update: update 50 tasks (rename + change priority)
3. Delete: delete 50 tasks

**Measurement method**
- Use `performance.now()` around each operation.
- Consider the operation complete only after DOM paint:
  - `requestAnimationFrame` twice before stopping timer.

**Fairness rules**
- Same UI/markup structure in every framework.
- Same dataset generator and update/delete selection strategy.
- Same browser (Chrome), same machine.
- 1 warm-up run + 5 measured runs, report average (optionally min/max).
