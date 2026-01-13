// -----------------------------
// Union-Find (Disjoint Set)
// -----------------------------
class UnionFind {
  constructor(vertices) {
    // parent[x] = who is the "leader" of x
    this.parent = {};
    // rank helps keep trees short (optimization)
    this.rank = {};

    for (const v of vertices) {
      this.parent[v] = v;
      this.rank[v] = 0;
    }
  }

  // Find the leader (root) of a set
  find(x) {
    if (this.parent[x] !== x) {
      // Path compression: point x directly to the root
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // Union two sets (connect them)
  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);

    // Already in same set => union not possible (would make cycle)
    if (rootA === rootB) return false;

    // Union by rank (attach smaller tree under larger tree)
    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }

    return true; // union done
  }
}

// -----------------------------
// Kruskal MST
// edges format: { u: "A", v: "B", w: 4 }
// -----------------------------
function kruskalMST(vertices, edges) {
  // 1) Sort edges by weight ascending
  const sorted = [...edges].sort((a, b) => a.w - b.w);

  const uf = new UnionFind(vertices);
  const mstEdges = [];
  let totalCost = 0;

  // 2) Pick edges one by one (cheapest first)
  for (const edge of sorted) {
    // if union returns true => no cycle created => accept edge
    if (uf.union(edge.u, edge.v)) {
      mstEdges.push(edge);
      totalCost += edge.w;

      // MST is complete when it has (V - 1) edges
      if (mstEdges.length === vertices.length - 1) break;
    }
  }

  // If we couldn't connect all vertices, graph was disconnected
  const isConnected = mstEdges.length === vertices.length - 1;

  return { mstEdges, totalCost, isConnected };
}

// -----------------------------
// Example data (office computers)
// -----------------------------
const vertices = ["A", "B", "C", "D", "E"];

const edges = [
  { u: "A", v: "B", w: 4 },
  { u: "A", v: "C", w: 2 },
  { u: "B", v: "C", w: 1 },
  { u: "B", v: "D", w: 5 },
  { u: "C", v: "D", w: 8 },
  { u: "C", v: "E", w: 10 },
  { u: "D", v: "E", w: 2 },
];

// Run MST
const result = kruskalMST(vertices, edges);

if (!result.isConnected) {
  console.log("Graph is disconnected: cannot build a full MST.");
} else {
  console.log("Selected connections (MST edges):");
  for (const e of result.mstEdges) {
    console.log(`${e.u} -- ${e.v} (cost ${e.w})`);
  }
  console.log("Total minimum cost =", result.totalCost);
}

// -----------------------------
// BONUS: add edges dynamically
// (simple function version)
// -----------------------------
function addEdge(edgesList, u, v, w) {
  edgesList.push({ u, v, w });
}

// Example: dynamically add a new cable option
addEdge(edges, "A", "E", 3);

// Re-run after adding
const result2 = kruskalMST(vertices, edges);
console.log("\nAfter adding A--E (cost 3):");
console.log(result2.mstEdges, "Total =", result2.totalCost);
