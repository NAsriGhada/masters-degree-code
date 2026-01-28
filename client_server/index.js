const http = require("http");
const { parse } = require("url");

let todos = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);

  // Helper to send JSON responses
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  // ---------------- GET /todos ----------------
  if (pathname === "/todos" && req.method === "GET") {
    return sendJSON(200, todos);
  }

  // ---------------- POST /todos ----------------
  if (pathname === "/todos" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body || "{}");

      if (!data.title) {
        return sendJSON(400, { error: "Title is required" });
      }

      const todo = {
        id: nextId++,
        title: data.title,
        completed: false,
      };

      todos.push(todo);
      sendJSON(201, todo);
    });

    return;
  }

  // ---------------- PUT /todos/:id ----------------
  if (pathname.startsWith("/todos/") && req.method === "PUT") {
    const id = Number(pathname.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body || "{}");
      const todo = todos.find((t) => t.id === id);

      if (!todo) {
        return sendJSON(404, { error: "Todo not found" });
      }

      if (data.title !== undefined) todo.title = data.title;
      if (data.completed !== undefined) todo.completed = data.completed;

      sendJSON(200, todo);
    });

    return;
  }

  // ---------------- DELETE /todos/:id ----------------
  if (pathname.startsWith("/todos/") && req.method === "DELETE") {
    const id = Number(pathname.split("/")[2]);
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return sendJSON(404, { error: "Todo not found" });
    }

    todos.splice(index, 1);
    return sendJSON(204, null);
  }

  // ---------------- NOT FOUND ----------------
  sendJSON(404, { error: "Route not found" });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
