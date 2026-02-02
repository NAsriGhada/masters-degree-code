/**
 * Distributed Key-Value Store Simulation
 * - Consistent hashing with virtual nodes
 * - Replication factor (R=2) for limited availability during failures
 * - Client-side LRU cache for faster reads
 * - Node join/leave + minimal data movement observation
 *
 * Run: node kv_sim.js
 */

const crypto = require("crypto");

/** ---------- Utilities ---------- **/
function hashToInt(str) {
  // 32-bit hash from sha1 (stable for consistent hashing ring)
  const hex = crypto.createHash("sha1").update(str).digest("hex");
  // take first 8 hex chars => 32-bit integer
  return parseInt(hex.slice(0, 8), 16);
}

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

/** ---------- LRU Cache (client-side) ---------- **/
class LRUCache {
  constructor(capacity = 5) {
    this.capacity = capacity;
    this.map = new Map(); // key -> value, Map preserves insertion order
  }

  get(key) {
    if (!this.map.has(key)) return null;
    const val = this.map.get(key);
    // refresh recency
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  set(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      // evict least-recently-used (first item)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }

  clear() {
    this.map.clear();
  }

  dump() {
    return Array.from(this.map.entries());
  }
}

/** ---------- Storage Node ---------- **/
class Node {
  constructor(id) {
    this.id = id;
    this.alive = true;
    this.store = new Map(); // key -> value
  }

  put(key, value) {
    if (!this.alive) throw new Error(`NODE_DOWN:${this.id}`);
    this.store.set(key, value);
  }

  get(key) {
    if (!this.alive) throw new Error(`NODE_DOWN:${this.id}`);
    return this.store.has(key) ? this.store.get(key) : null;
  }

  delete(key) {
    if (!this.alive) throw new Error(`NODE_DOWN:${this.id}`);
    this.store.delete(key);
  }

  keys() {
    return Array.from(this.store.keys());
  }
}

/** ---------- Consistent Hash Ring ---------- **/
class ConsistentHashRing {
  constructor({ vnodes = 50, replicationFactor = 2 } = {}) {
    this.vnodes = vnodes;
    this.replicationFactor = replicationFactor;

    // ring positions: sorted array of { pos, nodeId }
    this.ring = [];
    this.nodes = new Map(); // nodeId -> Node
  }

  addNode(nodeId) {
    if (this.nodes.has(nodeId)) return;
    const node = new Node(nodeId);
    this.nodes.set(nodeId, node);

    for (let i = 0; i < this.vnodes; i++) {
      const pos = hashToInt(`${nodeId}::vn${i}`);
      this.ring.push({ pos, nodeId });
    }
    this.ring.sort((a, b) => a.pos - b.pos);
  }

  removeNode(nodeId) {
    this.nodes.delete(nodeId);
    this.ring = this.ring.filter((p) => p.nodeId !== nodeId);
  }

  setNodeAlive(nodeId, alive) {
    const node = this.nodes.get(nodeId);
    if (!node) throw new Error(`Unknown node ${nodeId}`);
    node.alive = alive;
  }

  getNode(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) throw new Error(`Unknown node ${nodeId}`);
    return node;
  }

  /**
   * Find primary + replicas for a key.
   * We walk clockwise in the ring and pick unique nodeIds.
   */
  getOwners(key) {
    if (this.ring.length === 0) throw new Error("No nodes in ring.");

    const keyHash = hashToInt(key);

    // binary search first position >= keyHash
    let lo = 0,
      hi = this.ring.length - 1;
    let idx = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (this.ring[mid].pos >= keyHash) {
        idx = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }

    const owners = [];
    const used = new Set();

    let i = idx;
    while (
      owners.length < this.replicationFactor &&
      used.size < this.nodes.size
    ) {
      const nodeId = this.ring[i].nodeId;
      if (!used.has(nodeId)) {
        used.add(nodeId);
        owners.push(nodeId);
      }
      i = (i + 1) % this.ring.length;
    }

    return owners;
  }

  /**
   * For reporting: map each key -> owners under current ring.
   */
  assignment(keys) {
    const out = {};
    for (const k of keys) {
      out[k] = this.getOwners(k);
    }
    return out;
  }

  /**
   * Rebalance: move keys to their correct owners.
   * Minimal movement happens naturally because consistent hashing changes only some owners.
   *
   * Strategy: gather all key-values from all nodes, then re-place them according to owners.
   * For demo simplicity only.
   */
  rebalance() {
    // collect all items (de-duplicate by key using latest seen)
    const all = new Map();
    for (const node of this.nodes.values()) {
      for (const [k, v] of node.store.entries()) {
        all.set(k, v);
      }
      node.store.clear();
    }

    // place onto correct owners
    for (const [k, v] of all.entries()) {
      const owners = this.getOwners(k);
      for (const ownerId of owners) {
        this.nodes.get(ownerId).store.set(k, v);
      }
    }
  }

  /**
   * Count how many keys changed primary owner between two assignments.
   */
  static countPrimaryMoves(beforeAssign, afterAssign) {
    let moved = 0;
    const keys = Object.keys(beforeAssign);
    for (const k of keys) {
      const beforePrimary = beforeAssign[k][0];
      const afterPrimary = afterAssign[k][0];
      if (beforePrimary !== afterPrimary) moved++;
    }
    return moved;
  }
}

/** ---------- Client (transparency) ---------- **/
class KVClient {
  constructor(ring, { cacheCapacity = 4 } = {}) {
    this.ring = ring;
    this.cache = new LRUCache(cacheCapacity);
  }

  put(key, value) {
    const owners = this.ring.getOwners(key);
    // write to all replicas (simple)
    for (const nodeId of owners) {
      const node = this.ring.getNode(nodeId);
      node.put(key, value);
    }
    this.cache.set(key, value); // update cache
  }

  get(key) {
    // 1) cache
    const cached = this.cache.get(key);
    if (cached !== null) return { value: cached, from: "CACHE" };

    // 2) try primary then replicas
    const owners = this.ring.getOwners(key);
    for (const nodeId of owners) {
      const node = this.ring.getNode(nodeId);
      try {
        const v = node.get(key);
        if (v !== null) {
          this.cache.set(key, v);
          return { value: v, from: nodeId };
        }
      } catch (e) {
        // node down => try next replica
      }
    }

    return { value: null, from: "MISS" };
  }

  cacheDump() {
    return this.cache.dump();
  }

  clearCache() {
    this.cache.clear();
  }
}

/** ---------- Demo Data ---------- **/
const sampleData = [
  ["user:101", { name: "Alice" }],
  ["user:102", { name: "Bob" }],
  ["user:103", { name: "Charlie" }],
  ["user:104", { name: "Diana" }],
  ["user:105", { name: "Eve" }],
  ["user:106", { name: "Frank" }],
];

/** ---------- Demo / Simulation ---------- **/
function printAssignment(title, assign) {
  console.log("\n=== " + title + " ===");
  for (const k of Object.keys(assign).sort()) {
    console.log(
      `${k} -> primary=${assign[k][0]} replicas=${assign[k].slice(1).join(", ")}`,
    );
  }
}

function runSimulation() {
  console.log(
    "Distributed KV Store Simulation (Consistent Hashing + Cache + Failures)\n",
  );

  const ring = new ConsistentHashRing({ vnodes: 40, replicationFactor: 2 });

  // Start with 3 nodes
  ring.addNode("Node-A");
  ring.addNode("Node-B");
  ring.addNode("Node-C");

  const client = new KVClient(ring, { cacheCapacity: 3 });
  const keys = sampleData.map(([k]) => k);

  // Initial assignment
  const before = ring.assignment(keys);
  printAssignment("Initial assignment (3 nodes)", before);

  // Put data
  console.log("\nPutting sample data...");
  for (const [k, v] of sampleData) client.put(k, v);

  // Read a couple times to show cache
  console.log("\nReads (showing cache behavior):");
  console.log("GET user:101 ->", client.get("user:101"));
  console.log("GET user:101 again ->", client.get("user:101")); // should be cache
  console.log("Cache now ->", client.cacheDump());

  // Node join
  console.log("\n--- Node JOIN: adding Node-D ---");
  ring.addNode("Node-D");
  const afterJoin = ring.assignment(keys);
  printAssignment("Assignment after join (4 nodes)", afterJoin);

  const movedOnJoin = ConsistentHashRing.countPrimaryMoves(before, afterJoin);
  console.log(
    `\nPrimary keys moved after join: ${movedOnJoin}/${keys.length} (consistent hashing => minimal movement)`,
  );

  // rebalance to reflect new owners (demo)
  ring.rebalance();

  // Node leave
  console.log("\n--- Node LEAVE: removing Node-B ---");
  const beforeLeave = ring.assignment(keys);
  ring.removeNode("Node-B");
  const afterLeave = ring.assignment(keys);
  printAssignment("Assignment after leave (Node-B removed)", afterLeave);

  const movedOnLeave = ConsistentHashRing.countPrimaryMoves(
    beforeLeave,
    afterLeave,
  );
  console.log(
    `\nPrimary keys moved after leave: ${movedOnLeave}/${keys.length}`,
  );

  // rebalance again
  ring.rebalance();

  // Failure simulation: bring down primary for a key and show replica serves
  console.log(
    "\n--- Failure simulation (limited availability via replication) ---",
  );
  client.clearCache();

  const targetKey = "user:104";
  const owners = ring.getOwners(targetKey);
  console.log(`${targetKey} owners ->`, owners);

  console.log("Bringing DOWN primary:", owners[0]);
  ring.setNodeAlive(owners[0], false);

  // should still succeed from replica
  const r1 = client.get(targetKey);
  console.log(`GET ${targetKey} with primary down ->`, r1);

  console.log("Bringing DOWN replica too:", owners[1]);
  ring.setNodeAlive(owners[1], false);

  // now it should fail (MISS) => limited availability
  client.clearCache();
  const r2 = client.get(targetKey);
  console.log(`GET ${targetKey} with both replicas down ->`, r2);

  // restore nodes for cleanliness
  for (const nodeId of owners) {
    if (ring.nodes.has(nodeId)) ring.setNodeAlive(nodeId, true);
  }

  console.log(
    "\n✅ Transparency: User only calls client.get/put. Node routing, replication, caching are hidden.",
  );
}

runSimulation();
