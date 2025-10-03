// Task 01: Iterating with Async/Await (1s between logs)
async function iterateWithAsyncAwait(values) {
  for (const v of values) {
    console.log("Value:", v);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // inline delay
  }
}

// Task 02: Awaiting a Call
async function awaitCall() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log("awaitCall data:", data);
}

// Task 03: Handling Errors with Async/Await (+ chaining async/await)
async function awaitCallWithErrorHandling() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/this-will-404"
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log("Data:", data);
  } catch (err) {
    console.error(
      "Sorry, something went wrong while fetching data. Please try again later."
    );
    console.error("Debug:", err.message);
  }
}

// Chaining Async/Await: three separate async functions, 1s apart
async function step1() {
  await new Promise((r) => setTimeout(r, 1000));
  console.log("Step 1 done");
}
async function step2() {
  await new Promise((r) => setTimeout(r, 1000));
  console.log("Step 2 done");
}
async function step3() {
  await new Promise((r) => setTimeout(r, 1000));
  console.log("Step 3 done");
}
async function chainedAsyncFunctions() {
  await step1();
  await step2();
  await step3();
  console.log("All chained steps completed");
}

// Task 04: Awaiting Concurrent Requests (Promise.all)
async function concurrentRequests() {
  const [users, posts] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
  ]);
  console.log("Concurrent combined:", { users, posts });
}

// Task 05: Awaiting Parallel Calls (array of URLs)
async function parallelCalls(urls) {
  const results = await Promise.all(
    urls.map((u) => fetch(u).then((r) => r.json()))
  );
  console.log("Parallel results:", results);
}

// ----- Demo Runner -----
(async function demo() {
  console.log("\n--- Task 01 ---");
  await iterateWithAsyncAwait([10, 20, 30]);

  console.log("\n--- Task 02 ---");
  await awaitCall();

  console.log("\n--- Task 03 ---");
  await awaitCallWithErrorHandling();

  console.log("\n--- Chaining ---");
  await chainedAsyncFunctions();

  console.log("\n--- Task 04 ---");
  await concurrentRequests();

  console.log("\n--- Task 05 ---");
  await parallelCalls([
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3",
  ]);
})();
