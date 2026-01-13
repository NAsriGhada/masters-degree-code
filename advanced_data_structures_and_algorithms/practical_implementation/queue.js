// ---------------- Queue ----------------
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    console.log(this.items);
  }
}

// ------------ Printer Queue ------------
class PrinterQueue {
  constructor() {
    this.queue = new Queue();
  }

  addJob(name, pages) {
    this.queue.enqueue({ name, pages });
    console.log(`Job added: ${name} (${pages} pages)`);
  }

  processJob() {
    if (this.queue.isEmpty()) {
      console.log("No jobs to process");
      return;
    }
    const job = this.queue.dequeue();
    console.log(`Printing: ${job.name} (${job.pages} pages)`);
  }

  showQueue() {
    console.log("Current Queue:");
    this.queue.printQueue();
  }
}

// ---------------- Testing ----------------
const printer = new PrinterQueue();

printer.addJob("Alice", 10);
printer.addJob("Bob", 5);
printer.addJob("Charlie", 20);

printer.showQueue();

printer.processJob();
printer.processJob();

printer.showQueue();

printer.processJob();
printer.processJob();
