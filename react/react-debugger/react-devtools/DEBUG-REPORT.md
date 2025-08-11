# React DevTools Checkpoint – Debug Report

**Author:** Ghada  
**Date:** 2025-08-11  
**Stack:** React 18, CRA, Chrome/Firefox + React Developer Tools v4

---

## Overview

This exercise used a small React app with deliberate bugs to practice diagnosing and fixing issues using **React Developer Tools** (Components + Profiler).  
The app has three parts:

- **`Counter`** – shows a number, auto-increments via `setInterval`, and has a `+1` button.
- **`TodoList`** – filters a list of todos.
- **`TodoItem`** – renders a single todo title.

---

## How to Run

```bash
npm install
npm start
```

Open the browser DevTools → **Components** / **Profiler** tabs (React DevTools extension).

---

## What I Investigated (Using React DevTools)

### 1) Components tab
- **Selected components** using the Inspect pointer and via the tree.
- **Inspected props and hooks** (state/effects/memo) in the right panel.
- **Edited state inline**: double-clicked the value next to **Hooks → State** to test UI changes.
  - Note: Editing **props** (e.g., `start`) doesn’t retrofit into state created with `useState(start)`; you must edit **state** or **Remount** the component (circular-arrow icon) to re-initialize.
- **Jumped to source** using the “view source” link under **source**.
- **Highlighted updates** (DevTools settings) to visualize re-renders.

### 2) Profiler tab
- **Recorded interactions** (typing in the filter box, clicking `+1`).
- Reviewed **Flamegraph** / **Ranked** views to see which components re-rendered and why.
- Confirmed render causes were state/prop changes after fixes (no unnecessary re-renders).

---

## Issues Found & Fixes

### A) Counter didn’t auto-increment reliably
**Symptoms**
- Counter behaved inconsistently; interval didn’t always reflect the latest count.

**Diagnosis (Components tab)**
- `useEffect` had `[auto]` as its dependency.
- Interval callback referenced `count` directly → **stale closure**.

**Fix**
Use a **functional state update** inside the interval so it always gets the latest value. Keeping `[auto]` is then safe.

```diff
useEffect(() => {
  if (!auto) return;
  const id = setInterval(() => {
-   setCount(count + 1);
+   setCount((c) => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, [auto]);
```

**Verification**
- Edited **Hooks → State** inline to confirm UI reacts.
- Observed smooth increments every second.
- Profiler shows only `Counter` re-rendering per tick.

---

### B) Filtering didn’t work in TodoList
**Symptoms**
- Typing in the filter input had no effect.

**Diagnosis (Components tab)**
- `useMemo` for `filtered` had an **empty dependency array** (`[]`), so the memoized value never updated when `filter` or `items` changed.

**Fix**
Add correct dependencies.

```diff
- const filtered = useMemo(() => {
-   return items.filter((t) =>
-     t.title.toLowerCase().includes(filter.toLowerCase())
-   );
- }, []);
+ const filtered = useMemo(() => {
+   return items.filter((t) =>
+     t.title.toLowerCase().includes(filter.toLowerCase())
+   );
+ }, [items, filter]);
```

**Verification**
- Components tab showed `filter` state changing and `filtered` recomputing.
- Profiler exhibited re-renders on `TodoList` and only affected `TodoItem`s.

---

### C) Todo items appeared blank
**Symptoms**
- List rendered empty bullets/blank rows.

**Diagnosis (Components tab)**
- In `TodoItem`, prop **`title` was `undefined`**.
- Parent passed `text={t.title}` (wrong prop name).

**Fix**
Pass the correct prop name and a stable key.

```diff
- {filtered.map((t, i) => (
-   <TodoItem key={i} text={t.title} />
- ))}
+ {filtered.map((t) => (
+   <TodoItem key={t.id} title={t.title} />
+ ))}
```

**Verification**
- Components tab shows `TodoItem` receiving `title: "..."`.
- UI renders titles correctly.

---

### D) Unstable keys caused potential reordering issues
**Symptoms**
- Risk of odd behavior during filtering.

**Diagnosis**
- Keys were **array indexes** (`key={i}`).

**Fix**
- Switched to **stable ids** (`key={t.id}`) — already included in fix above.

**Verification**
- No React key warnings in console; consistent identity across filters.

---

## DevTools Tips Applied

- **Inline edit state:** Components → Hooks → double-click the value → Enter.  
- **Remount:** Components header → circular arrow icon.  
- **Jump to source:** Right panel → **source** link.  
- **Highlight updates:** Components tab → gear icon → enable “Highlight updates”.  
- **Profile:** Profiler tab → Start → interact → Stop → analyze.

---

## Final State of the Code (Key Excerpts)

```jsx
// Counter: fixed interval callback
useEffect(() => {
  if (!auto) return;
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);
}, [auto]);
```

```jsx
// TodoList: fixed memo deps + key + prop name
const filtered = useMemo(() => {
  return items.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );
}, [items, filter]);

<ul>
  {filtered.map((t) => (
    <TodoItem key={t.id} title={t.title} />
  ))}
</ul>
```

---

## Verification Checklist

- [x] Counter increments every second and on `+1`.
- [x] Filtering responds instantly and matches input.
- [x] `TodoItem` shows correct text; no blanks.
- [x] No key warnings in console.
- [x] Profiler: only relevant components re-render.

---

## Lessons Learned

- Use **functional state updates** for timers, async callbacks, and event listeners to avoid stale closures.
- Keep **dependency arrays** accurate for `useEffect`/`useMemo` to prevent stale values.
- Prefer **stable keys** (`id`) instead of indexes, especially when filtering/reordering lists.
- In DevTools, **edit state** for quick UI experiments; **remount** if you need state to re-initialize from changed props.

---

## Screenshots (placeholders)

- `screenshots/components-counter-hooks.png` – Counter hooks before/after fix  
- `screenshots/components-todoitem-props.png` – TodoItem receiving `title`  
- `screenshots/profiler-after.png` – Profiler flamegraph after fixes

---

## Appendix – Quick DevTools How-To

- **Edit state inline:** Components → Hooks → double-click the value → Enter.  
- **Remount:** Components header → circular arrow icon.  
- **Jump to source:** Right panel → **source** link.  
- **Highlight updates:** Components tab → gear icon → enable “Highlight updates”.  
- **Profile:** Profiler tab → Start → interact → Stop → analyze.

---
