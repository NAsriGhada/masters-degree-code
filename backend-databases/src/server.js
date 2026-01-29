import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { connectMongo } from "./db/mongo.js";
import { mysqlPool } from "./db/mysql.js";

const port = process.env.PORT || 4000;

async function start() {
  // Connect Mongo
  await connectMongo();

  // Ping MySQL
  await mysqlPool.query("SELECT 1");
  console.log("✅ MySQL connected");

  app.listen(port, () =>
    console.log(`✅ API running on http://localhost:${port}`),
  );
}

start().catch((e) => {
  console.error("❌ Startup failed:", e);
  process.exit(1);
});
