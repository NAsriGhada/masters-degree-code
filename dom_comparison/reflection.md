


```md
## Reflection (200–300 words)

The main challenge was keeping the benchmark fair across frameworks. Small differences like list keying (React `key`, Vue `:key`, Svelte keyed each-block, Angular `trackBy`) and update timing can strongly affect results, so I standardized the task model, DOM structure, and measurement method. Another challenge was measuring “real” DOM work instead of just state updates. To solve this, I used `performance.now()` around each operation and waited for DOM paint using two `requestAnimationFrame` calls before stopping the timer.

Each framework’s DOM update strategy impacts performance differently. React typically relies on virtual DOM diffing and reconciliation, so performance depends heavily on stable keys and minimizing unnecessary re-renders. Vue also uses a virtual DOM, but its reactivity system can reduce overhead by tracking dependencies more precisely. Svelte stands out because it compiles updates at build time; instead of diffing a virtual DOM at runtime, it generates direct DOM operations, which often reduces update overhead. Angular’s performance depends on change detection; using `trackBy` is important to prevent full list re-creation, and the framework has more baseline overhead due to its larger runtime features.

In my results, Svelte tended to perform best in frequent update/delete scenarios due to compile-time DOM targeting. React and Vue performed competitively for initial rendering and moderate updates when keyed correctly. Angular was generally slower for heavy list operations because of change detection and framework overhead, but `trackBy` significantly improved it compared to naive rendering.
