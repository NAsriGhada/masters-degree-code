class Graph {
  constructor({ directed = false } = {}) {
    this.directed = directed;
    // adjacency list: Map<vertex, Set<neighbor>>
    this.adj = new Map();
  }

  addVertex(v) {
    if (!this.adj.has(v)) this.adj.set(v, new Set());
  }

  addEdge(u, v) {
    // Ensure vertices exist
    this.addVertex(u);
    this.addVertex(v);

    // Add u -> v
    this.adj.get(u).add(v);

    // If undirected, also add v -> u
    if (!this.directed) {
      this.adj.get(v).add(u);
    }
  }

  removeEdge(u, v) {
    if (this.adj.has(u)) this.adj.get(u).delete(v);

    if (!this.directed && this.adj.has(v)) {
      this.adj.get(v).delete(u);
    }
  }

  hasEdge(u, v) {
    return this.adj.has(u) && this.adj.get(u).has(v);
  }

  print() {
    for (const [vertex, neighbors] of this.adj.entries()) {
      console.log(`${vertex} -> ${[...neighbors].join(", ")}`);
    }
  }

  // DFS (iterative to avoid recursion depth issues)
  dfs(start) {
    if (!this.adj.has(start)) return [];

    const visited = new Set();
    const stack = [start];
    const order = [];

    while (stack.length > 0) {
      const node = stack.pop();

      if (visited.has(node)) continue;
      visited.add(node);
      order.push(node);

      // Push neighbors onto stack.
      // Reversing makes the traversal order more predictable (like recursive DFS).
      const neighbors = [...this.adj.get(node)];
      neighbors.reverse();
      for (const nb of neighbors) {
        if (!visited.has(nb)) stack.push(nb);
      }
    }

    console.log("DFS order:", order.join(" -> "));
    return order;
  }

  // BFS
  bfs(start) {
    if (!this.adj.has(start)) return [];

    const visited = new Set([start]);
    const queue = [start];
    const order = [];

    while (queue.length > 0) {
      const node = queue.shift();
      order.push(node);

      for (const nb of this.adj.get(node)) {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push(nb);
        }
      }
    }

    console.log("BFS order:", order.join(" -> "));
    return order;
  }
}

/* =========================
   TESTING (Undirected)
========================= */
console.log("=== Undirected Graph ===");
const g1 = new Graph({ directed: false });

g1.addEdge("A", "B");
g1.addEdge("A", "C");
g1.addEdge("B", "D");
g1.addEdge("C", "D");

g1.print();
console.log("hasEdge(A,B):", g1.hasEdge("A", "B")); // true
g1.removeEdge("A", "B");
console.log("After removeEdge(A,B)");
g1.print();
console.log("hasEdge(A,B):", g1.hasEdge("A", "B")); // false

// Traversals from A
g1.dfs("A");
g1.bfs("A");

/* =========================
   TESTING (Directed)
========================= */
console.log("\n=== Directed Graph ===");
const g2 = new Graph({ directed: true });

g2.addEdge("A", "B");
g2.addEdge("A", "C");
g2.addEdge("B", "D");
g2.addEdge("D", "A"); // creates a cycle in directed graph

g2.print();
console.log("hasEdge(B,A):", g2.hasEdge("B", "A")); // false (directed)

g2.dfs("A");
g2.bfs("A");
