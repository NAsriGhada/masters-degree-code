// ----- Minimal binary min-heap for [priority, value] pairs -----
class MinHeap {
  constructor() {
    this.h = [];
  }
  size() {
    return this.h.length;
  }
  peek() {
    return this.h[0];
  }
  push(item) {
    this.h.push(item);
    this.#siftUp(this.h.length - 1);
  }
  pop() {
    if (this.h.length === 0) return undefined;
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length) {
      this.h[0] = last;
      this.#siftDown(0);
    }
    return top;
  }
  #siftUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p][0] <= this.h[i][0]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  #siftDown(i) {
    const n = this.h.length;
    while (true) {
      let l = (i << 1) + 1,
        r = l + 1,
        s = i;
      if (l < n && this.h[l][0] < this.h[s][0]) s = l;
      if (r < n && this.h[r][0] < this.h[s][0]) s = r;
      if (s === i) break;
      [this.h[s], this.h[i]] = [this.h[i], this.h[s]];
      i = s;
    }
  }
}

/**
 * Dijkstra's algorithm: shortest distances from `start` to all vertices.
 * @param {Object<string, Object<string, number>>} graph - adjacency with weights
 * @param {string} start - starting vertex key
 * @returns {Object<string, number>} distances map
 */
function dijkstra(graph, start) {
  if (!(start in graph)) {
    throw new Error(`Start vertex "${start}" not found in graph`);
  }

  // Initialize distances to Infinity, except start = 0
  const dist = {};
  for (const v of Object.keys(graph)) dist[v] = Infinity;
  dist[start] = 0;

  const visited = new Set();
  const pq = new MinHeap();
  pq.push([0, start]);

  while (pq.size()) {
    const [d, u] = pq.pop();
    if (visited.has(u)) continue;
    visited.add(u);

    // Skip if an outdated queue entry
    if (d !== dist[u]) continue;

    const neighbors = graph[u] || {};
    for (const [v, w] of Object.entries(neighbors)) {
      if (w < 0) {
        throw new Error(
          `Negative edge weight detected on ${u}→${v}: ${w}. Dijkstra requires non-negative weights.`
        );
      }
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        pq.push([nd, v]);
      }
    }
  }

  return dist;
}

// ----- Example usage -----
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};

console.log(dijkstra(graph, "A"));
// Expected: { A: 0, B: 4, C: 2, D: 5 }
