# Benchmark Results (Average of 5 runs)

Test method: `performance.now()` + double `requestAnimationFrame` to measure until DOM paint.

| Framework | Render 100 (ms) | Render 500 (ms) | Render 1000 (ms) | Update 50 (ms) | Delete 50 (ms) |
|----------|------------------|-----------------|------------------|----------------|----------------|
| React    |  29.9                |    131.7             |       94.3           |          54.6      |            49.2    |
| Vue      |        13.6          |       38.6          |      52.5            |           17.8     |         16.1       |
| Svelte   |   13.9               |      33.9           |             48.2     |            13.6    |            13.6    |
| Angular  |   34               |       45          |      17            |         66       |         14       |


