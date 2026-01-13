/******************************
 * 1) QUEUE IMPLEMENTATIONS
 ******************************/

/**
 * Array-based Queue (Fixed size) using circular buffer
 * enqueue/dequeue: O(1)
 * peek/isEmpty: O(1)
 */
class ArrayQueueFixed {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer.");
    }
    this.arr = new Array(capacity);
    this.capacity = capacity;
    this.front = 0; // index of front element
    this.rear = 0; // index where next element will be inserted
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }

  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue is full (fixed size).");
    }
    this.arr[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    const value = this.arr[this.front];
    this.arr[this.front] = undefined; // optional cleanup
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    return this.arr[this.front];
  }
}

/**
 * Linked List-based Queue (Dynamic size)
 * enqueue/dequeue: O(1)
 * peek/isEmpty: O(1)
 */
class LinkedListQueue {
  constructor() {
    this.head = null; // front
    this.tail = null; // rear
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(element) {
    const node = { value: element, next: null };
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (this.size === 0) this.tail = null;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    return this.head.value;
  }
}

/******************************
 * 2) PRIORITY QUEUE IMPLEMENTATIONS
 ******************************/

/**
 * We'll store items as objects: { value, priority }
 * Lower priority number = higher priority (min-heap).
 */
function assertValidItem(item) {
  if (!item || typeof item !== "object") {
    throw new Error("Item must be an object: { value, priority }");
  }
  if (!Number.isFinite(item.priority)) {
    throw new Error("Item.priority must be a number.");
  }
}

/**
 * Min-Heap-based Priority Queue
 * insert: O(log n)
 * extractMin: O(log n)
 * peekMin: O(1)
 */
class MinHeapPriorityQueue {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty.");
    }
    return this.heap[0];
  }

  insert(item) {
    assertValidItem(item);
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty.");
    }
    const min = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._bubbleDown(0);
    }
    return min;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i].priority >= this.heap[parent].priority) break;
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }

  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (
        right < n &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right;
      }
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

/**
 * Ordered Array-based Priority Queue (sorted by priority asc)
 * insert: O(n) because shifting to keep sorted
 * extractMin: O(1) if we store smallest at end OR start (we choose start)
 * peekMin: O(1)
 */
class OrderedArrayPriorityQueue {
  constructor() {
    this.arr = []; // sorted ascending by priority (min at index 0)
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty.");
    }
    return this.arr[0];
  }

  insert(item) {
    assertValidItem(item);

    // Find insertion index (linear scan). Could be binary search O(log n),
    // but insertion still requires shifting O(n).
    let i = 0;
    while (i < this.arr.length && this.arr[i].priority <= item.priority) {
      i++;
    }
    this.arr.splice(i, 0, item); // shifts elements to the right (O(n))
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty.");
    }
    return this.arr.shift(); // removing first element (O(n) due to shifting)
    // If you want extractMin O(1), store min at end and use pop(),
    // but then peekMin would be at end too (also O(1)).
  }
}

/******************************
 * 3) QUICK TESTS
 ******************************/
function runTests() {
  console.log("=== ArrayQueueFixed Tests ===");
  const q1 = new ArrayQueueFixed(3);
  console.log("isEmpty:", q1.isEmpty());
  q1.enqueue("A");
  q1.enqueue("B");
  q1.enqueue("C");
  console.log("peek:", q1.peek()); // A
  console.log(q1.dequeue()); // A
  q1.enqueue("D"); // uses circular slot
  console.log(q1.dequeue()); // B
  console.log(q1.dequeue()); // C
  console.log(q1.dequeue()); // D
  console.log("isEmpty:", q1.isEmpty());

  console.log("\n=== LinkedListQueue Tests ===");
  const q2 = new LinkedListQueue();
  q2.enqueue(1);
  q2.enqueue(2);
  console.log("peek:", q2.peek()); // 1
  console.log(q2.dequeue()); // 1
  console.log(q2.dequeue()); // 2
  console.log("isEmpty:", q2.isEmpty());

  console.log("\n=== MinHeapPriorityQueue Tests ===");
  const pq1 = new MinHeapPriorityQueue();
  pq1.insert({ value: "low", priority: 5 });
  pq1.insert({ value: "high", priority: 1 });
  pq1.insert({ value: "mid", priority: 3 });
  console.log("peekMin:", pq1.peekMin()); // high
  console.log(pq1.extractMin()); // high
  console.log(pq1.extractMin()); // mid
  console.log(pq1.extractMin()); // low
  console.log("isEmpty:", pq1.isEmpty());

  console.log("\n=== OrderedArrayPriorityQueue Tests ===");
  const pq2 = new OrderedArrayPriorityQueue();
  pq2.insert({ value: "low", priority: 5 });
  pq2.insert({ value: "high", priority: 1 });
  pq2.insert({ value: "mid", priority: 3 });
  console.log("peekMin:", pq2.peekMin()); // high
  console.log(pq2.extractMin()); // high
  console.log(pq2.extractMin()); // mid
  console.log(pq2.extractMin()); // low
  console.log("isEmpty:", pq2.isEmpty());

  console.log("\n✅ All basic tests finished.");
}

// Uncomment to run tests
runTests();
